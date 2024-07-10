const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./router/route.js");
const { connection } = require("mongoose");
require("dotenv").config();

const app = express();
/** app middlewares */
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

/** appliation port */
const PORT = process.env.PORT || 8080;

/** routes */
app.use("/api", router); /** apis */

app.get("/", (req, res) => {
  try {
    res.json("Get Request");
  } catch (error) {
    res.json(error);
  }
});

/** start server only when we have valid connection */
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB");
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
