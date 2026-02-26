import { Link, useNavigate } from "react-router-dom";
import { dashboard_menu } from "../../utils/data";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { API_ROUTES } from "../../utils/apiRoutes";
import { formatHour, getInitials } from "../../utils/helper";

const SideMenu = ({ activeMenu }) => {
    const navigate = useNavigate();
    const { user, updateUser, clearUser } = useContext(UserContext);

    // Obtain user information in case update
    useEffect(() => {
        if (user) return;

        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8000${API_ROUTES.AUTH.GET_USER}`, {
                    credentials: "include",
                });
                const userData = await response.json();
                updateUser(userData.user);
            } catch (error) {
                console.error("Something happened, failed to fetch", error);
                clearUser();
                navigate("/login");
            }
        };

        fetchUserData();
    }, [user, updateUser, clearUser]);

    return (
        <section className="absolute p-4 bg-zinc-100 w-64 h-[calc(100dvh-80px)] shadow-lg shadow-zinc-300 ">
            <div className="rounded-full bg-zinc-200 w-20 h-20 flex justify-center items-center mx-auto shadow-xl">
                <p className="italic font-bold text-lg text-zinc-500">{getInitials(user?.name)}</p>
            </div>
            <h5 className="text-center py-2 text-zinc-500">{user?.name}</h5>
            <div className="text-center pb-4 text-zinc-400 italic">
                <p>Last connection</p>
                <p className="text-md">{formatHour(user?.last_connection)}</p>
            </div>
            <ul className="flex flex-col gap-4">
                {dashboard_menu.map((menu) => {
                    if (activeMenu === menu.label) {
                        return (
                            <Link
                                to={menu.path}
                                key={`Menu_${menu.id}`}
                                className="py-2 px-6 flex items-center gap-4 text-lg text-bold bg-blue-500 text-zinc-200 rounded-lg"
                            >
                                <div>{menu.icon}</div>
                                <div>{menu.label}</div>
                            </Link>
                        );
                    }
                    return (
                        <Link
                            to={menu.path}
                            key={`Menu_${menu.id}`}
                            className="py-2 px-6 flex items-center gap-4 text-lg text-bold rounded-lg hover:bg-zinc-200 transition-colors ease-in-out"
                        >
                            <div>{menu.icon}</div>
                            <div>{menu.label}</div>
                        </Link>
                    );
                })}
            </ul>
        </section>
    );
};
export default SideMenu;
