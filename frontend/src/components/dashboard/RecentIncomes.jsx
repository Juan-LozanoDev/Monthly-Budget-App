import Loading from "./Loading";
import Transaction from "./Transaction";

const RecentIncomes = ({ incomes, loading }) => {
    if (loading) {
        return (
            <div className="px-4 py-4 md:px-6 bg-zinc-50 shadow-lg shadow-zinc-300 rounded-lg">
                <h5 className="pb-4 text-slate-500 font-semibold">Recent Incomes</h5>
                <Loading />
            </div>
        );
    }

    return (
        <div className="px-4 py-4 md:px-6 bg-zinc-50 shadow-lg shadow-zinc-300 rounded-lg">
            <h5 className="pb-4 text-slate-500 font-semibold">Recent Incomes</h5>
            {incomes?.transactions.map((inc) => {
                const { incomes_id, category, income, income_date } = inc;
                return (
                    <Transaction
                        description={"Pago de algo"}
                        amount={income}
                        date={income_date}
                        type={"income"}
                        key={`Recent_income${incomes_id}`}
                    />
                );
            })}
        </div>
    );
};

export default RecentIncomes;
