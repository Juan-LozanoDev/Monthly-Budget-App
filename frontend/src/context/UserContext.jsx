import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Method for update user information
    const updateUser = (userData) => {
        setUser(userData);
    };

    // Method for clear user information
    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("authenticated")
    };

    return <UserContext.Provider value={{ user, setUser, updateUser, clearUser }}>{children}</UserContext.Provider>;
};

export default UserProvider;
