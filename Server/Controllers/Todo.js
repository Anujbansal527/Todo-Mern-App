const User = require("../Models/UserModel");
const Todo = require("../Models/TodoModel");

const AddTodo = async (req,res) => {
    try {
        const {title,body,userId} = req.body;
        const existUser = await User.findOne({ _id:userId })
        if(existUser){
            const todo = new Todo({ title , body , user:existUser});
            await todo.save();
            existUser.todo.push(todo);
            existUser.save();
            res.status(200).json({
                todo,
                userId,
                msg:"Todo Created Sucesfull"
            })
        }
    } catch (error) {
        res.status(500).json({msg:"Unable to create Todo"})
    }
}

const UpdateTodo = async (req,res) => {
    try {
        const {title,body,userId} = req.body;
        const id = req.params.id;
        const existUser = await User.findOne({ _id:userId })
        if(existUser){
            const todo =  await Todo.findByIdAndUpdate({_id:id},{title,body});
            res.status(200).json({
                msg:"Todo Update Sucessfull"
          })
        }
    } catch (error) {
        res.status(500).json({msg:"Unable To Update Todo"})
    }
}

const DeleteTodo = async (req,res) => {
    try {
        const data = req.user;
        const id = req.params.id;
        const existUser = await User.findOneAndUpdate({ _id:data._id }, {$pull:{todo:id}})
        console.log(existUser)
        if(existUser){
           const todo =  await Todo.findByIdAndDelete({_id:id});
            res.status(200).json({
                msg:"Todo Deleted Sucessfull"
          })
        }
    } catch (error) {
        res.status(500).json({msg:"Unable To Delete Todo"})
    }
}

const FetchTodo = async (req,res) => {
    try {
        const userid = req.params.id;
        const todo = await Todo.find({ user: userid}).sort({createdAT:-1});
        if(todo.length !==0 ){
            return res.status(200).json({
            todo
        })
        }
        res.status(201).json({msg:"No data found"})
    } catch (error) {
        res.status(500).json({msg:"Uable to Fetch Todos"})
    }
}


module.exports = {AddTodo,UpdateTodo,DeleteTodo,FetchTodo}