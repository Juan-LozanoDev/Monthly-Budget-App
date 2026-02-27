import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "../utils/apiRoutes";

const useUserAuth = () => {
    const { user, updateUser, clearUser } = useContext(UserContext);
    const navigate = useNavigate()

    // Obtain user information in case update
    useEffect(() => {
        if (user) return;

        const fetchUserData = async () => {

            try {
                const response = await fetch(`http://localhost:8000${API_ROUTES.AUTH.GET_USER}`, {
                    credentials: "include",
                });
                const userData = await response.json();

                if (response.status === 400 || response.status === 500) {
                    localStorage.setItem("authenticated", userData.authenticated);
                    throw new Error("User no authenticated");
                }

                updateUser(userData.user);
            } catch (error) {
                console.error("Something happened, failed to fetch", error);
                clearUser();
                navigate("/login");
            }
        };

        fetchUserData();
    }, [user, updateUser, clearUser]);

};

export default useUserAuth;
