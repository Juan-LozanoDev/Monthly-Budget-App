import Transaction from "./Transaction";

const RecentTransactions = ({ transactions }) => {
    return (
        <div className="px-6 py-4 bg-zinc-50 shadow-lg shadow-zinc-300 rounded-lg">
            <h5 className="pb-4 text-slate-600">Recent Transactions</h5>
            {transactions?.map((transaction) => {
                const { amount, date, type } = transaction;
                return <Transaction description={"Pago de algo"} amount={amount} date={date} type={type} />;
            })}
        </div>
    );
};

export default RecentTransactions;
