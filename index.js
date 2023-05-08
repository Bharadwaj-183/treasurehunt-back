const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.json());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://admin-bharadwaj:Bharadwaj_183@cluster0.h2kohig.mongodb.net/treasureDB"
  );
  console.log("db connected");
}

const userSchema = new mongoose.Schema({
  userId: String,
  password: String,
  stage1Time: Number,
  stage2Time: Number,
  stage3Time: Number,
  stage4Time: Number,
  stage5Time: Number,
  stage1Points: Number,
  stage2Points: Number,
  stage3Points: Number,
  stage4Points: Number,
  stage5Points: Number,
  overallPoints: Number,
});

const User = mongoose.model("User", userSchema);

// app.get("/demo", (req, res) => {
//   res.send("hello");
// });

app.post("/demo", async (req, res) => {
  let user = new User(req.body);
  //   user.userName = req.body.name;
  //   user.password = req.body.password;
  console.log(req.body);
  //   user = req.body;
  const doc = await user.save();
  console.log(doc);
  res.json(doc);

  //   console.log("posted");
  //   res.send(req.body);
});

app.get("/demo", async (req, res) => {
  const docs = await User.find({});
  // await User.deleteMany({ stage1Points: 0 });
  res.send(docs);
  console.log("Found docs", docs);
});

app.post("/demo/login", async (req, res) => {
  console.log("login request");
  const loggedinUser = await User.findOne({ userId: req.body.userId });
  if (loggedinUser) {
    const { userId } = loggedinUser;
    console.log("loggedinUser in back", loggedinUser);
    res.send({ userId });
  } else {
    // throw new Error("No user");
    res.status(404).send(new Error("No such user "));
  }
  //   if (loggedinUser) {
  //     if (loggedinUser.password === req.body.password) {
  //       res.send(req.body.userId);
  //     } else {
  //       res.send("wrong password");
  //     }
  //   } else {
  //     res.send("wrong userID");
  //   }
});

app.post("/demo/update1", async (req, res) => {
  console.log("update request");
  console.log("user", req.body.userId);
  const updated = await User.updateOne(
    { userId: req.body.userId },
    { stage1Time: req.body.stage1Time, stage1Points: req.body.stage1Points }
  );
  console.log((await updated).matchedCount);
  console.log((await updated).acknowledged);
  res.send(updated.acknowledged);
});

app.post("/demo/update2", async (req, res) => {
  console.log("update request");
  console.log("user", req.body.userId);
  const updated = await User.updateOne(
    { userId: req.body.userId },
    { stage2Time: req.body.stage2Time, stage2Points: req.body.stage2Points }
  );
  console.log((await updated).matchedCount);
  console.log((await updated).acknowledged);
  res.send(updated.acknowledged);
});

app.post("/demo/update3", async (req, res) => {
  console.log("update request");
  console.log("user", req.body.userId);
  const updated = await User.updateOne(
    { userId: req.body.userId },
    { stage3Time: req.body.stage3Time, stage3Points: req.body.stage3Points }
  );
  console.log((await updated).matchedCount);
  console.log((await updated).acknowledged);
  res.send(updated.acknowledged);
});

app.post("/demo/update4", async (req, res) => {
  console.log("update request");
  console.log("user", req.body.userId);
  const updated = await User.updateOne(
    { userId: req.body.userId },
    { stage4Time: req.body.stage4Time, stage4Points: req.body.stage4Points }
  );
  console.log((await updated).matchedCount);
  console.log((await updated).acknowledged);
  res.send(updated.acknowledged);
});

app.post("/demo/update5", async (req, res) => {
  console.log("update request");
  console.log("user", req.body.userId);
  const updated = await User.updateOne(
    { userId: req.body.userId },
    {
      stage5Time: req.body.stage5Time,
      stage5Points: req.body.stage5Points,
      overallPoints: req.body.overallPoints,
    }
  );
  console.log((await updated).matchedCount);
  console.log((await updated).acknowledged);
  res.send(updated.acknowledged);
});

app.listen(8080, () => {
  console.log("listening on 8080");
});
