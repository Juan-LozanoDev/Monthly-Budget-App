import { Icons } from "../../Icons/Icons";
import { formatDate, thousandSeparator } from "../../utils/helper";

const Transaction = ({ description, amount, date, type }) => {
    return (
        <div className="py-4 flex gap-4 md:gap-8 items-center justify-between">
            <div className="w-12 h-12 bg-zinc-100 rounded-full flex justify-center items-center">ICONO</div>
            <div className="flex-1">
                <p className="font-semibold">{description}</p>
                <p className="font-medium text-sm text-zinc-300">{formatDate(date)}</p>
            </div>

            {type === "income" ? (
                <div className="px-2 py-1 flex gap-1 items-center justify-center bg-green-300 rounded-md text-green-600">
                    <p className="font-medium text-sm">+ ${thousandSeparator(Number(amount))}</p>
                    {Icons.trending_up}
                </div>
            ) : type === "expense" ? (
                <div className="px-2 py-1 flex gap-1 items-center justify-center bg-red-300 rounded-md text-red-600">
                    <p className="font-medium text-sm">- ${thousandSeparator(Number(amount))}</p>
                    {Icons.trending_down}
                </div>
            ) : (
                <div className="px-2 py-1 flex gap-1 items-center justify-center bg-yellow-200 rounded-md text-yellow-500">
                    <p className="font-medium text-sm">+ ${thousandSeparator(Number(amount))}</p>
                    {Icons.trending_down}
                </div>
            )}
        </div>
    );
};

export default Transaction;
