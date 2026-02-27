import { thousandSeparator } from "../../utils/helper";


const InfoCard = ({ cardInfo, type, color, icon }) => {
    return (
        <div className="flex gap-2 h-25 items-center py-4 px-4 bg-zinc-50 shadow-lg shadow-zinc-300 rounded-xl">
            <div className={`flex justify-center items-center w-15 h-15 ${color} rounded-full shadow shadow-zinc-700 text-white `} >
                {icon}
            </div>
            <div>
                <p className="text-zinc-400 font-bold">Total {type}</p>
                <p className="font-bold text-xl text-slate-500">${thousandSeparator(cardInfo)}</p>
            </div>
        </div>
    );
};

export default InfoCard;
