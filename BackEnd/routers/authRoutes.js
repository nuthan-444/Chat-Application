const express = require("express");
const router = express.Router();
const {creatingUserController,deletingUserController} = require("../controllers/signup.controller");
const {userLogin} = require("../controllers/login.controller");


//creating user
router.post("/signup",creatingUserController);
//deleting user
router.delete("/deleteuser/_id/:_id",deletingUserController);

//login user
router.post("/login",userLogin);


module.exports = router