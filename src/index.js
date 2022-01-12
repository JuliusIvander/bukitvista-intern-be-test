const express = require("express");
const db = require("./configs/db");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/user");
const movieRouter = require("./routes/movies");
const auth = require("./middlewares/authHandlers");

const app = express();

try {
  db.sync();
  db.authenticate();
  console.log("Success Connecting DB");
} catch (error) {
  console.log(error);
  console.log("Failed to Connect DB");
}

app.use(cookieParser(), express.json(), express.urlencoded({ extended: true }));

// Adding route section
app.use("/auth", userRouter);
app.use("/movies", auth, movieRouter);

app.listen(5000, () => {
  console.log("Listening to Port 5000");
});
