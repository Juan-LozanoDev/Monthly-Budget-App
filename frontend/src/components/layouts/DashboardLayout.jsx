import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ activeMenu }) => {
    return (
        <>
            <Navbar activeMenu={activeMenu} />
            <aside className="hidden md:block">
                <SideMenu activeMenu={activeMenu} />
            </aside>
            
        </>
    );
};

export default DashboardLayout;
