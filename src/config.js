require("dotenv").config();

module.exports = {
    natsUrl: process.env.NATS_URL,
    webPort: process.env.PORT,
    frontendCallbackURL: process.env.FRONTEND_CALLBACK_URL,
    jwtSecret: process.env.JWT_SECRET,
    twitch: {
        channelId: process.env.TWITCH_CHANNEL_ID,
        clientId: process.env.TWITCH_CLIENT_ID,
        clientSecret: process.env.TWITCH_CLIENT_SECRET,
        callbackURL: process.env.TWITCH_CALLBACK_URL
    }
};
