import React, { createContext, useState } from 'react';

export const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
    const [role, setRole] = useState(null);

    const setUserRole = (newRole) => {
        setRole(newRole);
    };

    return (
        <UserContext.Provider value={{ role, setUserRole }}>
            {children}
        </UserContext.Provider>
    );
};