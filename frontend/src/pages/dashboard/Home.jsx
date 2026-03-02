import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import { API_ROUTES } from "../../utils/apiRoutes";
import { Icons } from "../../Icons/Icons";
import InfoCard from "../../components/dashboard/InfoCard";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import BalancePie from "../../components/dashboard/BalancePie";
import RecentExpenses from "../../components/dashboard/RecentExpenses";
import RecentIncomes from "../../components/dashboard/RecentIncomes";

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
                console.log(data);
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
                    <InfoCard
                        cardInfo={dashboardData?.totalBalance}
                        type={"Balance"}
                        color={"bg-blue-400"}
                        icon={Icons.balance}
                        loading={loading}
                    />
                    <InfoCard
                        cardInfo={dashboardData?.totalIncomes}
                        type={"Income"}
                        color={"bg-green-500"}
                        icon={Icons.walletIncome}
                        loading={loading}
                    />
                    <InfoCard
                        cardInfo={dashboardData?.totalExpenses}
                        type={"Expense"}
                        color={"bg-red-400"}
                        icon={Icons.receipt}
                        loading={loading}
                    />
                    <InfoCard
                        cardInfo={dashboardData?.totalInvestments}
                        type={"Investment"}
                        color={"bg-yellow-400"}
                        icon={Icons.stock}
                        loading={loading}
                    />
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-5">
                    <RecentTransactions transactions={dashboardData?.recentTransactions} loading={loading} />
                    <BalancePie
                        balance={dashboardData?.totalBalance}
                        incomes={dashboardData?.totalIncomes}
                        expenses={dashboardData?.totalExpenses}
                        investments={dashboardData?.totalInvestments}
                        loading={loading}
                    />
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-5">
                    <RecentIncomes incomes={dashboardData.last60DaysIncome}></RecentIncomes>
                    <RecentExpenses expenses={dashboardData?.last30DaysExpenses}></RecentExpenses>
                </div>
            </section>
        </DashboardLayout>
    );
};

export default Home;
