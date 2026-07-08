import React from 'react'
import UseAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {

    const {user,initializing}=UseAuth();

    if (initializing) {
        return <div>loading...</div>;
    }

    if (!user) {
        return <Navigate to={"/login"} replace/>
    }


  return children;
}

export default ProtectedRoute