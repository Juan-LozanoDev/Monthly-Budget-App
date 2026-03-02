import Loading from "./Loading";
import Transaction from "./Transaction";

const RecentExpenses = ({ expenses, loading }) => {
    if (loading) {
        return (
            <div className="px-4 py-4 md:px-6 bg-zinc-50 shadow-lg shadow-zinc-300 rounded-lg">
                <h5 className="pb-4 text-slate-500 font-semibold">Recent Expenses</h5>
                <Loading />
            </div>
        );
    }

    return (
        <div className="px-4 py-4 md:px-6 bg-zinc-50 shadow-lg shadow-zinc-300 rounded-lg">
            <h5 className="pb-4 text-slate-500 font-semibold">Recent Expenses</h5>
            {expenses?.transactions.map((exp) => {
                const { expenses_id, category, expense, expense_date } = exp;
                return (
                    <Transaction
                        description={"Pago de algo"}
                        amount={expense}
                        date={expense_date}
                        type={"expense"}
                        key={`Recent_expense${expenses_id}`}
                    />
                );
            })}
        </div>
    );
};

export default RecentExpenses;
