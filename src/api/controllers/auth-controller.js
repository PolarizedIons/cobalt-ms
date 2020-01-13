const express = require("express");
const authFlow = require("../utils/auth-flow");
const config = require("../../config");
const RichResponse = require("../rich-response");

const router = express
    .Router()
    .get("/login", authFlow.loginMiddleware)
    .get("/callback", (req, res) =>
        authFlow
            .callbackMiddleware(req, res)
            .then(authFlow.fetchBadges)
            .then(badgeUser => {
                const token = authFlow.genJwtToken(badgeUser);
                res.redirect(config.frontendCallbackURL + "#" + token);
            })
            .catch(() => res.redirect(config.frontendCallbackURL))
    )
    .post("/refresh", authFlow.verifyJwtToken, (req, res) => {
        new RichResponse(req, res).ok(authFlow.genJwtToken(req.tokenData));
    });

module.exports = app => {
    app.use("/auth", router);
};
