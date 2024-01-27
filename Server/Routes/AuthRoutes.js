const { AddUser, LoginUser, UserAuth } = require("../Controllers/authController");
const AuthMiddle = require("../Middlewares/authMiddleware")
const router = require("express").Router();


router.route("/register").post(AddUser);

router.route("/login").post(LoginUser);

router.route("/users").get(AuthMiddle,UserAuth)


module.exports = router;