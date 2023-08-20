const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function getUserData(req, res) {
  try {
    let userData = await userModel.findById(req.user.userID);
    res.json(userData);
  } catch (err) {
    res.status(403).json({ err });
  }
}

async function addUser(req, res) {
  try {
    let user = req.body;
    let newPass = bcrypt.hashSync(req.body.password, 10);
    user.password = newPass;
    let newUser = await userModel.create(user);
    if (!newUser) {
      return res
        .status(505)
        .json({ message: "error signing up please try again" });
    }
    res.json(newUser);
  } catch (err) {
    res.json(err.message);
  }
}

async function login(req, res) {
  try {
    let user = await userModel.findOne({ userName: req.body.userName });
    if (!user) {
      return res.status(404).json({ message: "user is not found" });
    }
    let valiedPass = bcrypt.compareSync(req.body.password, user.password);
    if (!valiedPass) {
      return res.status(404).json({ message: "wrong password" });
    }
    let token = jwt.sign(
      {
        data: {
          userName: user.userName,
          userID: user.id,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    // res.cookie("token", token, { maxAge: 2 * 60 * 60 * 1000 });
    if (!token) {
      return res.json(404).json({ message: "error in generating token" });
    }
    res.json({ token });
  } catch (err) {
    res.json(err.message);
  }
}

async function editProfile(req, res) {
  try {
    let userID = req.user.userID;
    if (!userID) {
      return res.status(401).json("unauthorized");
    }
    if (req.body.password) {
      return res.status(403).json({
        message:
          "you can't change password in this page, go to change password page",
      });
    }

    let updatedUser = await userModel.findByIdAndUpdate(userID, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json("user not found");
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(403).json(err);
  }
}

async function changePassword(req, res) {
  try {
    let userID = req.user.userID;
    if (!userID) {
      return res.status(401).json("unauthorized");
    }
    let user = await userModel.findById(userID);
    let valiedPass = bcrypt.compareSync(req.body.password, user.password);
    if (!valiedPass) {
      return res.status(404).json("wrong password");
    }
    let newPass = bcrypt.hashSync(req.body.newPassword, 10);
    user.password = newPass;
    let updatedUser = await userModel.findByIdAndUpdate(userID, user, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json("user not found");
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(403).json(err);
  }
}

module.exports = { addUser, login, getUserData, editProfile, changePassword };
