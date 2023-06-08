const express = require("express");
const mongoose = require("mongoose");
const User = require("./modals/user");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await User.create({
      email: req.body.email,
      password: req.body.password,
    });
    console.log(response);
    return res.status(201).json({
      success: true,
      message: "Successfully created a user",
      data: response,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      data: {},
      message: "Something went wrong",
      err: error,
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: {},
        err: {},
      });
    }
    if (user.password !== req.body.password) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
        data: {},
        err: {},
      });
    }
    return res.status(200).json({
      success: true,
      message: "Successfully logged in",
      data: user,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      data: {},
      message: "Something went wrong",
      err: error,
    });
  }
});

app.listen(3002, async () => {
  await mongoose.connect(
    "mongodb+srv://somansh:somansh@cluster1.7pbk3q3.mongodb.net/"
  );
  console.log("Mongodb connected");
  console.log("server started running on port", 3000);
});
