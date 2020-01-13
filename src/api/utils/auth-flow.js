const passport = require("passport");
const twitchStrategy = require("passport-twitch-new").Strategy;
const jwt = require("jsonwebtoken");
const config = require("../../config");
const RichResponse = require("../rich-response");
const twitchHttpClient = require("../utils/twicth-http-client");

const authorizedBadges = ["broadcaster", "moderator"];

passport.use(
    new twitchStrategy(
        {
            clientID: config.twitch.clientId,
            clientSecret: config.twitch.clientSecret,
            callbackURL: config.twitch.callbackURL,
            scope: "user_read",
        },
        (accessToken, refreshToken, profile, done) => {
            done(null, profile);
        }
    )
);

module.exports.loginMiddleware = passport.authenticate("twitch");

module.exports.callbackMiddleware = (req, res) =>
    new Promise((resolve, reject) => {
        passport.authenticate(
            "twitch",
            {
                failureRedirect: config.frontendCallbackURL,
                session: false,
            },
            (err, user) => {
                if (err) {
                    return reject(err.message);
                }

                if (!user || !user.id) {
                    return reject("Unauthorized");
                }

                resolve(user);
            }
        )(req, res);
    });

module.exports.fetchBadges = twitchUser => {
    return twitchHttpClient
        .get(
            `https://api.twitch.tv/kraken/users/${twitchUser.id}/chat/channels/${config.twitch.channelId}`
        )
        .then(r => {
            if (
                r.data.badges.find(
                    badge => authorizedBadges.indexOf(badge.id) > -1
                )
            ) {
                return r.data;
            } else {
                throw new Error("Unauthorized");
            }
        });
};

module.exports.genJwtToken = twitchUser => {
    return jwt.sign(
        {
            data: twitchUser,
        },
        config.jwtSecret,
        { expiresIn: "24h" }
    );
};

module.exports.verifyJwtToken = (req, res, next) => {
    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer ")
    ) {
        new RichResponse(req, res).unauthorized("No bearer token");
    }

    jwt.verify(
        req.headers.authorization.split(" ").pop(),
        config.jwtSecret,
        (err, decoded) => {
            if (err) {
                return new RichResponse(req, res).unauthorized(
                    "Token verification failed"
                );
            }

            req.tokenData = decoded;
            next();
        }
    );
};
