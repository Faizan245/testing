const express = require("express");
const mongoose = require("mongoose");
//const router = require("./routes/user-routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();

const router = express.Router();
// const express = require("express");
const {
  signup,
  login,
  verifyToken,
  getUser,
  refreshToken,
  logout,
} = require("./controllers/user-controller");



router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.get("/refresh", refreshToken, verifyToken, getUser);
router.post("/logout", verifyToken, logout);
//module.exports = router;
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);
mongoose
  .connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORORD}@cluster0.hes3x.mongodb.net/auth?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5001);
    console.log("Database is connected! Listening to localhost 5000");
  })
  .catch((err) => console.log(err));
//mongodb+srv://vrGroot:{process.env.MONGODB_PASSWORORD}@freecluster.xpwrtvt.mongodb.net/?retryWrites=true&w=majority