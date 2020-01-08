const express = require("express");
const NATS = require("nats");
const nats = require("../nats");
const Response = require("./response");

const router = express.Router();

router.get("/commands", (req, res) => {
    req.log.debug("Getting list of commands");
    const resp = new Response(req, res);

    nats.requestOne("commandList", 10000, response => {
        if (
            response instanceof NATS.NatsError &&
            response.code === NATS.REQ_TIMEOUT
        ) {
            req.log.error("NATS Timeout");
            return resp.err("Timeout getting list of commands");
        }

        if (!response.success) {
            req.log.error("Error fetching", response.err);
            return resp.err("Error fetching list of commands");
        }
        resp.ok(response.data);
    });
});
module.exports = app => {
    app.use("/v1", router);
};
