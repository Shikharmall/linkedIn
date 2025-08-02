var express = require("express");
var user_route = express();

const isLogin = require("../middleware/isLogin");

const userController = require("../controllers/User/userController");
const postController = require("../controllers/Post/postController");

const validateForm = require("../validation/validation");

const bodyParser = require("body-parser");
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

// api for register user

user_route.post("/registerUser", validateForm, userController.registerUser);

// api for login

user_route.post("/login", userController.loginUser);

// api for getting user details

user_route.get("/getUserDetails", isLogin, userController.getUserDetails);

// api for adding post

user_route.post("/addPost", isLogin, postController.addPost);

// api for getting a question

user_route.get("/getAllPosts", isLogin, postController.getAllPosts);

// api for getting all questions

user_route.get("/getMyPosts", isLogin, postController.getMyPost);

// api for logout

user_route.post("/logout", isLogin, userController.logout);

module.exports = user_route;
