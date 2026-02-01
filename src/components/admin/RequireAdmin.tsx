import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export function RequireAdmin({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const isAuthenticated = localStorage.getItem('admin_authenticated') === 'true';

    if (!isAuthenticated) {
        // Redirect to login page, but save the current location they were trying to go to
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    return (
        <>
            {children}
        </>
    );
}
