const pino = require("pino");

const levels = {
  http: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};

module.exports = pino({
  prettyPrint: true,
  customLevels: levels,
  useOnlyCustomLevels: true,
  level: "http",
  prettyPrint: {
    colorize: true,
    levelFirst: true,
    translateTime: "dd-mm-yyyy hh:MM:ss",
  },
});
