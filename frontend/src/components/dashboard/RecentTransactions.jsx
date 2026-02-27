import Transaction from "./Transaction";

const RecentTransactions = ({ transactions }) => {
    return (
        <div className="px-4 py-4 md:px-6 bg-zinc-50 shadow-lg shadow-zinc-300 rounded-lg">
            <h5 className="pb-4 text-slate-500 font-semibold">Recent Transactions</h5>
            {transactions?.map((transaction) => {
                const { amount, date, type } = transaction;
                return <Transaction description={"Pago de algo"} amount={amount} date={date} type={type} />;
            })}
        </div>
    );
};

export default RecentTransactions;
