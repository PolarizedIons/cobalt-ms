const express = require("express");
const NATS = require("nats");
const nats = require("../nats");
const RichResponse = require("./rich-response");

const router = express.Router();

const TIMEOUT_MS = 10000;

const natsComm = (requestTopic, richResponse, commDesc) => {
    richResponse.req.log.debug("NATS comm: " + commDesc);

    nats.requestOne(requestTopic, 10000, response => {
        if (
            response instanceof NATS.NatsError &&
            response.code === NATS.REQ_TIMEOUT
        ) {
            req.log.error("NATS Timeout");
            return richResponse.err("Timeout getting list of commands");
        }

        if (!response.success) {
            req.log.error("Error fetching", response.err);
            return richResponse.err("Error fetching list of commands");
        }
        richResponse.ok(response.data);
    });
};

router.get("/commands", (req, res) => {
    natsComm("commandList", new RichResponse(req, res), "list of commands");
});

// router.get("/commands", (req, res) => {
//     req.log.debug("Getting list of commands");
//     const resp = new RichResponse(req, res);

//     nats.requestOne("commandList", 10000, response => {
//         if (
//             response instanceof NATS.NatsError &&
//             response.code === NATS.REQ_TIMEOUT
//         ) {
//             req.log.error("NATS Timeout");
//             return resp.err("Timeout getting list of commands");
//         }

//         if (!response.success) {
//             req.log.error("Error fetching", response.err);
//             return resp.err("Error fetching list of commands");
//         }
//         resp.ok(response.data);
//     });
// });

module.exports = app => {
    app.use("/v1", router);
};
