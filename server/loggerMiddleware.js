const winston = require("winston");

const levels = {
  accesslog: 4, // This level is exclusively for logging of all access to the UI server
  debug: 3, // This level is to be used when you want to log something to help with debugging
  info: 2, // Similar to console.info and to be used instead of it (all console.info(s) will be logged via this)
  warn: 1, // Similar to console.warn and to be used instead of it (all console.warn(s) will be logged via this)
  error: 0, // Similar to console.error and to be used instead of it (all console.error(s) will be logged via this)
};

const transports = [new winston.transports.Console({ level: "info" })];

const loggerParams = {
  transports,
  format: winston.format.combine(winston.format.json()),
  levels,
};

//eslint-disable-next-line new-cap -- library name imported as is, fine in this case
const logger = winston.createLogger(loggerParams);

//Needed because we are adding custom levels
winston.addColors({});

const loggerMiddleware = (req, res, next) => {
  const url = req.url;
  const referer = req.headers?.referer;

  // Memory leak happens here
  req.logger = winston.createLogger({
    ...loggerParams,
    defaultMeta: {
      url,
      referer,
    },
  });

  next();
};

module.exports = loggerMiddleware;
