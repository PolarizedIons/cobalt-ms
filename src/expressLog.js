const log = require("./log");

module.exports = (req, res, next) => {
    res.locals["START_TIME"] = res.locals["START_TIME"] || Date.now();
    req.log = res.log = log.child({
        headers: req.headers,
        body: req.body,
        url: req.url,
        method: req.method,
        params: req.params,
        query: req.query
    });
    next();
};
