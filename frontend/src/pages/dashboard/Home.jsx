import { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import { UserContext } from "../../context/UserContext";
import { API_ROUTES } from "../../utils/apiRoutes";
import { Icons } from "../../Icons/Icons";
import InfoCard from "../../components/dashboard/InfoCard";
import RecentTransactions from "../../components/dashboard/RecentTransactions";

const Home = () => {
    useUserAuth();

    const [dashboardData, useDashboardData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:8000${API_ROUTES.DASHBOARD.GET_DASHBOARD}`, {
                    credentials: "include",
                });

                const data = await response.json();
                useDashboardData(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    return (
        <DashboardLayout activeMenu={"Dashboard"}>
            <section className="py-5 px-4 flex-1">
                <div className="mb-5 grid grid-cols-1 md:grid-cols-responsive-300 gap-4">
                    <InfoCard cardInfo={dashboardData?.totalBalance} type={"Balance"} color={'bg-blue-400'} icon={Icons.balance} />
                    <InfoCard cardInfo={dashboardData?.totalIncomes} type={"Income"} color={'bg-green-500'} icon={Icons.walletIncome}/>
                    <InfoCard cardInfo={dashboardData?.totalExpenses} type={"Expense"} color={'bg-red-400'} icon={Icons.receipt}/>
                    <InfoCard cardInfo={dashboardData?.totalInvestments} type={"Investment"} color={'bg-yellow-400'} icon={Icons.stock}/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <RecentTransactions transactions={dashboardData?.recentTransactions}/>
                </div>
            </section>
        </DashboardLayout>
    );
};

export default Home;
