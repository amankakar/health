const routes = require("next-routes")();
routes

  .add("/hospital/register", "/hospital/register")
  .add("/hospital/:address", "/hospital/hospitalDetails")
  .add("/patient/", "/patient/")
  .add("/patient/record/:hash", "/patient/record")
  .add("/doctor", "/doctor")
  .add("/doctor/patientRecord/:patientId", "/doctor/patientRecord")
  .add("/doctor/record/:hash", "/doctor/record");

module.exports = routes;
