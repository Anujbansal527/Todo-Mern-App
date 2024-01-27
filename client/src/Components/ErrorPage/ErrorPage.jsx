import { NavLink } from "react-router-dom";
import "./ErrorPage.css"

const ErrorPage = () => {

    return (
        
        <div id="error-page">
            <div className="content">
                <h2 className="header">404</h2>
                <h4>Sorry !! Page Not Found</h4>
                <p>
                    Ooops ! seems like the page you're trying to access doesn't exist.
                </p>
                <div className="btns">
                    <NavLink to="/">Return Home</NavLink>
                    <NavLink to="/contact">Report a Problem</NavLink>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage;