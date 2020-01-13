module.exports = app => {
    require("./controllers/auth-controller")(app);
    require("./controllers/commands-controller")(app);
};
