const ms = require("ms");
const log = require("../log");

module.exports = class RichResponse {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    ok(data = null, status = 200) {
        log.child({
            status,
            data
        }).debug(
            `${this.req.method} ${this.req.originalUrl} finished in ${ms(
                Date.now() - this.res.locals["START_TIME"]
            )}.`
        );
        this.res.status(status).json({ success: true, data: data });
    }

    err(message = "Unknown error", status = 500) {
        log.child({
            status,
            message
        }).debug(
            `${this.req.method} ${this.req.originalUrl} finished in ${ms(
                Date.now() - this.res.locals["START_TIME"]
            )}.`
        );
        this.res.status(status).json({ success: false, error: message });
    }

    created(data) {
        this.ok(data, 201);
    }

    badRequest(message) {
        this.err(message, 400);
    }

    validationFailed(error) {
        this.badRequest(error.details.map(errorObj => errorObj.message));
    }

    unauthorized(message) {
        this.err(message, 401);
    }

    notFound(message) {
        this.err(message, 404);
    }

    pagination(data, currentPage, hasNextPage, totalRows) {
        this.ok({
            page: currentPage,
            hasNextPage: hasNextPage,
            hasPreviousPage: currentPage > 1,
            totalRows: totalRows,
            items: data
        });
    }
};
