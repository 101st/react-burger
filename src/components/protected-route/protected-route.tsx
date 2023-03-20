import { Route, Redirect } from "react-router-dom";
import { getCookie } from '../../utils/cookies';

import Login from "../../pages/login/login";

interface IProtectedRoute {
  children: React.ReactElement;
  auth?: boolean;
  exact?: boolean;
  path?: string;
}

function ProtectedRoute({ children, auth, ...rest }: IProtectedRoute): React.ReactElement {
  const accessToken = getCookie('accessToken');
  if (auth) {
    if (accessToken !== undefined)
      return <Login />
    return children;
  } else {
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
}

export default ProtectedRoute;