import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
    return (
        <>
            <Navbar activeMenu={activeMenu} />
            <main className="flex">
                <aside className="hidden md:block w-64 h-[calc(100dvh-80px)]">
                    <SideMenu activeMenu={activeMenu} />
                </aside>
                {children}
            </main>
        </>
    );
};

export default DashboardLayout;
