import { useContext, useState } from "react";
import SideMenu from "./SideMenu";
import { UserContext } from "../../context/UserContext";
import { getInitials } from "../../utils/helper";

const Navbar = ({ activeMenu }) => {
    const [openMenu, setOpenMenu] = useState(false);
    const { user } = useContext(UserContext);

    return (
        <>
            <header className="w-full h-20">
                <div className="fixed p-4 flex gap-6 w-full h-20 justify-between items-center bg-zinc-50 shadow-lg shadow-zinc-300">
                    <button
                        className="block md:hidden cursor-pointer relative w-6 h-10"
                        onClick={() => setOpenMenu(!openMenu)}
                    >
                        <div
                            className="absolute w-full h-0.5 rounded bg-black top-1/3 transition-all ease-in"
                            style={openMenu ? { opacity: 0 } : {}}
                        ></div>
                        <div
                            className="absolute w-full h-0.5 rounded bg-black top-1/2 transition-all ease-in"
                            style={openMenu ? { rotate: "45deg" } : { translate: 0 }}
                        ></div>
                        <div
                            className="absolute w-full h-0.5 rounded bg-black top-2/3 transition-all ease-in"
                            style={openMenu ? { rotate: "-45deg", translate: "0 -350%" } : {}}
                        ></div>
                    </button>
                    <div className="flex-2">
                        <h3 className="font-geist-mono">Pay Wise</h3>
                    </div>
                    <div className="rounded-full bg-zinc-200 w-12 h-12 flex justify-center items-center mx-auto shadow-xl">
                        <p className="italic font-bold text-md text-zinc-500">{getInitials(user?.name)}</p>
                    </div>
                </div>
            </header>
            {openMenu ? (
                <aside className="block md:hidden">
                    <SideMenu activeMenu={activeMenu} />
                </aside>
            ) : (
                <></>
            )}
        </>
    );
};

export default Navbar;
