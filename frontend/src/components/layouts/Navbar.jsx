import { useState } from "react";
import { Icons } from "../../Icons/Icons";
import SideMenu from "./SideMenu";

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <>
            <header className="p-4 flex gap-6 w-dvw h-20 justify-between items-center bg-zinc-100 shadow-lg shadow-zinc-300">
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
                    <h4>Pay Wise</h4>
                </div>
                <div className="">PROFILE</div>
            </header>
            {openMenu ? <SideMenu /> : <></>}
        </>
    );
};

export default Navbar;
