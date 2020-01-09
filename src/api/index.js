const express = require("express");
const NATS = require("nats");
const nats = require("../nats");
const RichResponse = require("./rich-response");

const TIMEOUT_MS = 10000;

const natsComm = (requestTopic, requestData, richResponse, commDesc) => {
    richResponse.req.log.debug("NATS comm: " + commDesc);

    nats.requestOne(requestTopic, requestData, TIMEOUT_MS, response => {
        if (
            response instanceof NATS.NatsError &&
            response.code === NATS.REQ_TIMEOUT
        ) {
            richResponse.req.log.error("NATS Timeout");
            return richResponse.err(`Timeout fetching: ${commDesc}`);
        }

        if (!response.success) {
            richResponse.req.log.error("Error fetching", response.err);
            return richResponse.err(`Error fetching: ${commDesc}`);
        }

        richResponse.ok(response.data);
    });
};

const commandsRouter = express
    .Router()
    .get("/", (req, res) => {
        natsComm(
            "commandList",
            {},
            new RichResponse(req, res),
            "list of commands"
        );
    })
    .put("/:id", (req, res) => {
        natsComm(
            "commandModify",
            req.body,
            new RichResponse(req, res),
            "save command"
        );
    })
    .delete("/:id", (req, res) => {
        natsComm(
            "commandDelete",
            { id: req.params.id },
            new RichResponse(req, res),
            "delete command"
        );
    });

module.exports = app => {
    app.use("/commands", commandsRouter);
};
