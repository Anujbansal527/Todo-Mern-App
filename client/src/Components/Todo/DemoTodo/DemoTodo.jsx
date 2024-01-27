import React, { useEffect, useState } from "react";
import "../Todo.css";
import { TodoCards } from "./TodoCards";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TodoUpdate from "./UpdateTodo/TodoUpdate";
import { useAuth } from "../../Store/auth";

export const DemoTodo = () => {
  
  const { user, isLoggedIn, GlobalAuthToken } = useAuth();

  const userId = user._id;

  const [data, setData] = useState({
    title: "",
    body: "",
    userId,
  });

  const [demo, setDemo] = useState([]);

  const show = () => {
    document.getElementById("text-area").style.display = "block";
  };

  const change = (e) => {
    const name = [e.target.name];
    const value = e.target.value;
    setData({ ...data, [name]: value, userId });
  };

  const submitData = async () => {
    if (data.title === "" || data.body === "") {
      toast.error("Please Provide Title Or Body");
    } else if (!isLoggedIn) {
      setDemo([...demo, data]);
      toast.error("Your Task is Added But Not Saved! Please Singup With Us");
    } else {
        toast.success("Your Task is Added");
        setData({
          title: "",
          body: "",
          userId,
        });
    }
  };

  const DeleteTodo = async(id) => {
    toast.success("Your Task Is Deleted")
    demo.splice(id, "1");
    setDemo([...demo]);
  };

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main d-flex justify-content-center align-content-center ">
          <div className="d-flex flex-column todo-inputs w-50 ">
            <input
              onClick={show}
              onChange={change}
              className="title my-2"
              type="text"
              placeholder="TITLE"
              name="title"
              id="title"
              value={data.title}
            />

            <textarea
              onChange={change}
              className="body p-2"
              type="text"
              placeholder="CONTENT"
              name="body"
              id="text-area"
              rows={3}
              value={data.body}
            />
            <br />
            <button className="todo-btn" onClick={submitData}>
              Add
            </button>
          </div>
        </div>
        <div className="todo-body">
          <div className="container">
            <div className="row">
              {demo &&
                demo.map((item, index) => {
                  return (
                    <div className="col-lg-3 col-10 mx-5 my-2" key={index}>
                      <TodoCards
                        title={item.title}
                        body={item.body}
                        id={item._id}
                        deleteItem={DeleteTodo}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center align-item-center ">
        <div
          className="todo-update"
          id="todoUpdate"
          style={{ display: "none" }}
        >
          <TodoUpdate />
        </div>
      </div>
    </>
  );
};
