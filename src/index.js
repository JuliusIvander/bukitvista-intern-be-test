const express = require("express");
const db = require("./configs/db");
const cookieParser = require("cookie-parser");

// Logger Library
const expressPinoLogger = require("express-pino-logger");
const logger = require("./services/loggerServices");

// Route Library
const userRouter = require("./routes/user");
const movieRouter = require("./routes/movies");
const auth = require("./middlewares/authHandlers");

const app = express();

const loggerMiddleware = expressPinoLogger({
  logger: logger,
  autoLogging: true,
});

// Checking db connectivity and synchronizing db
try {
  logger.info("Synchronizing DB");
  db.sync();
  logger.info("Authenticate DB");
  db.authenticate();
  logger.info("Success Connecting DB");
} catch (error) {
  logger.error(`Failed to Connect DB: ${error}`);
}

app.use(
  cookieParser(),
  express.json(),
  express.urlencoded({ extended: true }),
  loggerMiddleware
);

// Adding route section
app.use("/auth", userRouter);
app.use("/movies", auth, movieRouter);

app.listen(5000, () => {
  logger.info("Listening to Port 5000");
});
