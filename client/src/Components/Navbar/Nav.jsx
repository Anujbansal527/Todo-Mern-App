import React from "react";
import { Link } from "react-router-dom";
import { FcTodoList } from "react-icons/fc";
import "./Nav.css";
import { useAuth } from "../../Store/auth";

export const Nav = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <FcTodoList /> Todo
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item mx-1">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              </li>

              {isLoggedIn ? (
                <>
                  <li className="nav-item mx-1">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/todo"
                    >
                      Todos
                    </Link>
                  </li>

                  <li className="nav-item mx-1">
                    <Link
                      className="nav-link active btn-nav p-2"
                      aria-current="page"
                      to="/logout"
                    >
                      Log Out
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item mx-1">
                    <Link
                      className="nav-link active btn-nav p-2"
                      aria-current="page"
                      to="/signup"
                    >
                      SingUp
                    </Link>
                  </li>

                  <li className="nav-item mx-1">
                    <Link
                      className="nav-link active btn-nav p-2"
                      aria-current="page"
                      to="/login"
                    >
                      LogIn
                    </Link>
                  </li>
                </>
              )}

              <li className="nav-item mx-1">
                <Link className="nav-link active" aria-current="page" to="todo">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLKYamkRB_qMHdd_HvhrxBlHhExgcAW6Mquw&usqp=CAU"
                    alt="logo"
                    className="img-fluid user-logo"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
