const express = require("express");
const mongoose = require("mongoose");
const User = require("./modals/user");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  await User.create({ email, password });
  return res.status(200).json({
    success: true,
  });
});

app.listen(3000, async () => {
  await mongoose.connect(
    "mongodb+srv://somansh:somansh@cluster1.7pbk3q3.mongodb.net/"
  );
  console.log("Mongodb connected");
  console.log("server started running on port", 3000);
});
