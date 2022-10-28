import { Route, Redirect } from "react-router-dom";
import { element, any } from 'prop-types';
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


ProtectedRoute.propTypes = {
  children: element.isRequired,
  rest: any,
};


export default ProtectedRoute;