import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from 'prop-types'

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();

    if(loading){
        return <p className="text-center items-center">Loading....</p>
    }

    if(user){
        return children;
    }
    if(!user){
        return <Navigate to="/login"></Navigate>
    }
};

export default PrivateRoute;

PrivateRoute.propTypes = {
    children: PropTypes.node
}
