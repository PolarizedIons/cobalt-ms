const express = require("express");
const helmet = require("helmet");
const pinoExpress = require("express-pino-logger")();
const config = require("./config");
const log = require("./log");
const Response = require("./api/response");

const app = express();

app.use(helmet());
app.use(pinoExpress);

log.debug("Registering v1");
require("./api/v1")(app);

app.use("*", (req, res) => {
    new Response(req, res).notFound("Route not found");
});

app.listen(config.webPort, () =>
    log.info(`Listening on port ${config.webPort}`)
);
