import React from 'react';
import { Routes,Navigate, Route } from 'react-router-dom';



const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    element={
      isAuthenticated ? (
        <Component {...rest} />
      ) : (
        <Navigate
          to={{
            pathname: '/',
            state: { from: rest.location },
          }}
          replace
        />
      )
    }
  />
);

export default ProtectedRoute;
