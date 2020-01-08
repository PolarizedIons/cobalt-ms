const NATS = require("nats");
const config = require("./config");
const log = require("./log");

const nats = NATS.connect({
    url: config.natsUrl,
    json: true
});

nats.on("error", function(err) {
    log.error("NATS ERROR", err);
});

nats.on("connect", function(nc) {
    log.info("NATS connected");
});

nats.on("disconnect", function() {
    log.info("NATS disconnect");
});

nats.on("reconnecting", function() {
    log.info("NATS reconnecting");
});

nats.on("reconnect", function(nc) {
    log.info("NATS reconnect");
});

nats.on("close", function() {
    log.info("NATS close");
});

nats.on("permission_error", function(err) {
    log.error("NATS got a permissions error", err.message);
});

module.exports = nats;
