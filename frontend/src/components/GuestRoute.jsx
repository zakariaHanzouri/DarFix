
import UseAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

function GuestRoute({children}) {

    const {user,initializing}=UseAuth()

    if (initializing) {
        return <div> Loading... </div>
    }

    if (user) {
        return <Navigate to={'/'} replace />
    }

  return children;
}

export default GuestRoute