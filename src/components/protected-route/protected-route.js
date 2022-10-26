import { Route, Redirect } from "react-router-dom";
import { getCookie } from '../../utils/cookies';

function ProtectedRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        getCookie('accessToken') ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
}

export default ProtectedRoute;