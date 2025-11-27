const express = require("express");
const { model } = require("mongoose");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");
const user = require("../models/user.js");


router.route("/signup")
    .get(userController.renderSignupform)
    .post(wrapAsync(userController.signup));

router.route("/login")
    .get(userController.renderLoginform)
    .post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
        userController.Login
    );

router.get("/logout", userController.logout);

module.exports = router;