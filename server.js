// const { createServer } = require("http");
// const next = require("next");
// const app = next({
//   dev: process.env.NODE_ENV !== "production"
// });
// const routes = require("./routes");
// const handler = routes.getRequestHandler(app);
//
// app.prepare().then(() => {
//   createServer(handler).listen(3000, err => {
//     if (err) throw err;
//     console.log("Ready on localhost 3000");
//   });
// });

// server.js
const next = require("next");
const routes = require("./routes");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = routes.getRequestHandler(app);
var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
var server_host = process.env.YOUR_HOST || "0.0.0.0";
// With express
const express = require("express");

app.prepare().then(() => {
  express()
    .use(handler)
    .listen(server_port, server_host, err => {
      if (err) throw err;
      console.log(server_port);
    });
});
