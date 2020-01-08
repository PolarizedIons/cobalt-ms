require("dotenv").config();

module.exports = {
    natsUrl: process.env.NATS_URL,
    webPort: process.env.PORT
};
