import { Link, useNavigate } from "react-router-dom";
import { dashboard_menu } from "../../utils/data";

const SideMenu = () => {
    return (
        <aside className="absolute p-4 bg-zinc-100 w-64 h-[calc(100dvh-80px)] shadow-lg shadow-zinc-300 ">
            <ul className="flex flex-col gap-2">
                {dashboard_menu.map((menu) => (
                    <Link
                        to={menu.path}
                        key={`Menu_${menu.id}`}
                        className="py-2 px-6 flex items-center gap-3 text-lg text-bold bg-pink-200 rounded-md"
                    >
                        <div>{menu.icon}</div>
                        <div>{menu.label}</div>
                    </Link>
                ))}
            </ul>
        </aside>
    );
};
export default SideMenu;
