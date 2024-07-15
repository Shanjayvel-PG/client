// src/Components/ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const jwtToken = Cookies.get('jwt_token');

    return jwtToken ? <Route {...rest} element={<Component />} /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
