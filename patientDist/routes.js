const routes = require("next-routes")();
routes.add("/patient/", "/patient").add("/record/:hash", "/record");

module.exports = routes;
