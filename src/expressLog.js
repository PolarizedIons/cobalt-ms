const ms = require("ms");
const log = require("./log");

const startTime = Symbol("START_TIME");

module.exports = (req, res, next) => {
    res.locals[startTime] = res.locals[startTime] || Date.now();
    req.log = res.log = log.child({
        headers: req.headers,
        url: req.url,
        method: req.method,
        params: req.params,
        query: req.query
    });
    next();

    log.debug(
        `${req.method} ${req.originalUrl} finished in ${ms(
            Date.now() - res.locals[startTime]
        )}.`
    );
};
