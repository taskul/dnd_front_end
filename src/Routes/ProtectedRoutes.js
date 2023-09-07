import AuthContext from "../Context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ redirectToPath, children }) {
    const { currentUser, token } = useContext(AuthContext);
    // Check to see if the user is logged in, if they are logged in then render the child component
    // if the user is not logged in then redirect them to a redirectToPath
    return currentUser ? children : <Navigate to={redirectToPath} />
}
