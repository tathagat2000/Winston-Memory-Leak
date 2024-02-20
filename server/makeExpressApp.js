const express = require("express");

const loggerMiddleware = require("./loggerMiddleware");

function makeExpressApp() {
  const app = express();
  app.use(require("express-status-monitor")());
  app.use(loggerMiddleware);

  return app;
}

module.exports = makeExpressApp;
