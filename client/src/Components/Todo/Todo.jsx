import React, { useEffect, useState } from "react";
import "./Todo.css";
import { TodoCards } from "./TodoCards";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TodoUpdate from "./UpdateTodo/TodoUpdate";
import { useAuth } from "../../Store/auth";

export const Todo = () => {
  const { user, isLoggedIn, GlobalAuthToken, setOneTodo, oneTodo } = useAuth();

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
      const response = await fetch("http://localhost:5000/api/v1/addtodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Your Task is Added");
        setData({
          title: "",
          body: "",
          userId,
        });
      }
    }
  };

  const fetchTodo = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/gettodo/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: GlobalAuthToken,
          },
        }
      );
      const todos = await response.json();
      if (response.ok) {
        console.log(todos.todo);
        setDemo(todos.todo);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteTodo = async (id, ind) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/deletetodo/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: GlobalAuthToken,
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        fetchTodo();
        toast.success("Your Task Is Deleted");
        demo.splice(ind, "1");
        setDemo([...demo]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateTodo = async (id, ind) => {
    setOneTodo(demo[ind]);
    console.log(oneTodo);
    const target = (document.getElementById("todoUpdate").style.display =
      "block");
  };

  useEffect(() => {
    fetchTodo();
  }, [data,demo,isLoggedIn]);

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
                        ind={index}
                        deleteItem={DeleteTodo}
                        showUpdate={UpdateTodo}
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
          <TodoUpdate
            OneTodo={oneTodo}
            userId={user._id}
            fun={fetchTodo}
            toast={toast}
          />
        </div>
      </div>
    </>
  );
};
