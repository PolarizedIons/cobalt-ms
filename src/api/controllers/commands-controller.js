const express = require("express");
const RichResponse = require("../rich-response");
const natsComm = require("../utils/nats-comm");

const router = express
    .Router()
    .get("/", (req, res) => {
        natsComm(
            "commandList",
            {},
            new RichResponse(req, res),
            "list of commands"
        );
    })
    .post("/", (req, res) => {
        natsComm(
            "commandCreate",
            req.body,
            new RichResponse(req, res),
            "create command"
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
    app.use("/commands", router);
};
