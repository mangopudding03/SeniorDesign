import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { session } = UserAuth();
    if (session == undefined){
        return <p>Unauthorized Page</p>
    }

    return(
        <>
            {session? <>{children}</> : <Navigate to="/SignUp" />}  
        </>
    )

};

export default PrivateRoute;