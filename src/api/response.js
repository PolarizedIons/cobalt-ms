module.exports = class Response {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    ok(data = null, status = 200) {
        this.res.status(status).json({ success: true, data: data });
    }

    err(message = "Unknown error", code = 500) {
        this.res.status(code).json({ success: false, error: message });
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
