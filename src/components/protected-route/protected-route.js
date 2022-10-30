import { Route, Redirect } from "react-router-dom";
import { element, any } from 'prop-types';
import { getCookie } from '../../utils/cookies';

import NotFound from "../../pages/not-found/not-found";

function ProtectedRoute({ children, ...rest }) {
  const accessToken = getCookie('accessToken');
  if (rest?.auth) {
    if (accessToken !== undefined)
      return <NotFound />
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


ProtectedRoute.propTypes = {
  children: element.isRequired,
  rest: any,
};


export default ProtectedRoute;