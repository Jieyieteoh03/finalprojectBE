const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { MONGODB_URL } = require("./config");

const app = express();
app.use(express.json());
const port = 5000;

// setup cors
const corsHandler = cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
  preflightContinue: true,
});

app.use(corsHandler);
mongoose
  .connect(MONGODB_URL + "Holoweb")
  .then(() => console.log("MongoDBConnected... "))
  .catch((err) => console.log(err));

const authRouter = require("./routes/auth");
const talentRouter = require("./routes/talent");
const imageRouter = require("./routes/image");
const videoRouter = require("./routes/video");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");

app.use("/auth", authRouter);
app.use("/talents", talentRouter);
app.use("/images", imageRouter);
app.use("/videos", videoRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Holoweb");
});

// Server listening
app.listen(port, () => console.log(`Server started on port ${port}`));
