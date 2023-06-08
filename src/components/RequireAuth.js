import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function RequireAuth({ allowedRoles }) {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        //Check if user is Authorized
        (auth?.roles?.find(role => allowedRoles?.includes(role))) ? 
            //Render the intended view
            (<Outlet></Outlet>) : 

            //Else, check if user is logged in
            (auth?.user) ?
                //If logged In, but not authorized...
                (<Navigate to="/unauthorized" state={{ from: location }} replace />) :
                //If not logged In
                (<Navigate to="/login" state={{ from: location }} replace />)

                //Allow user to go back to whichever 'public' route they came from (hence -> replace)
                //Else they would be stuck on the login page (a Loop), when pressing back (Since it tries to go back to the protected route)
    )
}

export default RequireAuth;