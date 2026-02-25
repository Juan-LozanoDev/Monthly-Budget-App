import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <SideMenu />
        </>
    );
};

export default DashboardLayout;
