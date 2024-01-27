const {AddTodo, UpdateTodo, DeleteTodo, FetchTodo}= require("../Controllers/Todo")
const AuthMiddle = require("../Middlewares/authMiddleware")
const router = require("express").Router();


router.route("/addtodo").post(AddTodo);
router.route("/updatetodo/:id").patch(UpdateTodo);
router.route("/deletetodo/:id").post(AuthMiddle,DeleteTodo);
router.route("/gettodo/:id").get(FetchTodo);




module.exports = router;