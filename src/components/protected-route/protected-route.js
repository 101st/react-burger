import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children, ...rest }) {
    const { accessToken } = useSelector((state) => state.auth);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                accessToken ? (
                    children
                ) : (
                    <Redirect to={{ pathname: "/login", state: { from: location } }} />
                )
            }
        />
    );
}

export default ProtectedRoute;