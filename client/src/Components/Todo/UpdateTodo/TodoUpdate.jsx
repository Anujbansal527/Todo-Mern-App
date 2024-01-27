import React, { useEffect, useState } from "react";
import "./TodoUpdate.css";
import { FaRegWindowClose } from "react-icons/fa";
import { useAuth } from "../../../Store/auth";

const TodoUpdate = ({ OneTodo,userId,fun,toast}) => {

  const {GlobalAuthToken} = useAuth();

  const [update,setUpdate] = useState({
      title:OneTodo.title,
      body:OneTodo.body,
      id:OneTodo._id,
      userId,
  })

  const change = (e) => {
    const {name,value} = e.target;
    setUpdate({...update,[name]:value})
  }


  const updateTodo = async() => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/updatetodo/${OneTodo._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: GlobalAuthToken,
      },
      body:JSON.stringify(update),
    });
    if(response.ok)
    {
    document.getElementById("todoUpdate").style.display = "none";
    toast("Update SucessFully")
    fun();
    }
  }  
 catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fun()
  },[update])

  const disableUpdate = () => {
    document.getElementById("todoUpdate").style.display = "none";
  };

  return (
    <div className="update-main ">
      <div className="update-head">
        <h1>Update Task</h1>
        <FaRegWindowClose
          style={{ cursor: "pointer" }}
          onClick={disableUpdate}
          size={"40px"}
        />
      </div>

      <div className="update-inner">
        <input
          className="my-2"
          type="text"
          placeholder="TITLE"
          name="title"
          id="title"
          onChange={change}
          value={update.title}
        />
        <br />
        <textarea
          className="p-2"
          type="text"
          placeholder="CONTENT"
          name="body"
          onChange={change}
          value={update.body}
          rows={4}
        />
      </div>
      <div className="update-btn">
        <button className="todo-btn" onClick={updateTodo}>Update</button>
      </div>
    </div>
  );
};

export default TodoUpdate;
