const express = require("express");
const {
  addUser,
  login,
  editProfile,
  getUserData,
  changePassword,
} = require("../controllers/users.js");

const { auth } = require("../middlewares/auth.js");
const router = express.Router();

router.get("/", auth, getUserData);

router.post("/", addUser);

router.post("/login", login);

router.patch("/", auth, editProfile);

router.patch("/changePassword", auth, changePassword);

module.exports = router;
