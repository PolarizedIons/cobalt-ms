const NATS = require("nats");
const nats = require("../nats");

const TIMEOUT_MS = 10000;

module.exports = (requestTopic, requestData, richResponse, commDesc) => {
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
