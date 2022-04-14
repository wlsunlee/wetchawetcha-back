const express = require("express");
const router = express.Router();
const{ Authorization} = require("../controllers/middlewares/Authorization");

const UserController = require("../controllers/UserController");
router.post("/", UserController.signUp);
router.get("/", UserController.getUser);
router.post("/signin", UserController.signIn);
router.get("/verification",Authorization, UserController.verification);
module.exports = router;
