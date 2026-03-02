import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { thousandSeparator } from "../../utils/helper";
import { useEffect, useRef, useState } from "react";
import Loading from "./Loading";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const BalancePie = ({ balance, incomes, expenses, investments, loading }) => {
    const doughnutRef = useRef(null);

    const [centerY, setCenterY] = useState(0);

    useEffect(() => {
        if (!doughnutRef.current) return;
        const height = doughnutRef.current.chartArea.height;
        setCenterY(height / 2);
    }, []);

    const data = {
        labels: ["Balance", "Incomes", "Expenses", "Investments"],
        datasets: [
            {
                label: "amount",
                data: [balance, incomes, expenses, investments],
                backgroundColor: [
                    "rgba(81, 162, 255, 0.75)",
                    "rgba(0, 201, 81, 0.75)",
                    "rgba(255, 100, 103, 0.75)",
                    "rgba(253, 199, 0, 0.75)",
                ],
                borderColor: [
                    "rgba(81, 162, 255, 1)",
                    "rgba(0, 201, 81, 1)",
                    "rgba(255, 100, 103, 1)",
                    "rgba(253, 199, 0, 1)",
                ],
                borderWidth: 1,
                borderRadius: 10,
                hoverOffset: 10,
                rotation: 270,
            },
        ],
    };

    const options = {
        cutout: "75%",
        layout: {
            padding: 10,
        },
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    font: { size: 14, weight: "bold" },
                    padding: 30,
                    boxHeight: 5,
                    pointStyle: "circle",
                    pointStyleWidth: 7,
                    usePointStyle: true,
                },
            },
            centerTitle: {
                balance: balance,
            },
        },
    };

    if (loading) {
        return (
            <section className="p-4 w-full justify-center items-center bg-zinc-50 shadow-lg shadow-zinc-300 rounded-lg">
                <h5 className=" text-slate-500 font-semibold">Financial Overview</h5>
                <Loading />
            </section>
        );
    }

    return (
        <section className="p-4 w-full justify-center items-center bg-zinc-50 shadow-lg shadow-zinc-300 rounded-lg">
            <h5 className=" text-slate-500 font-semibold">Financial Overview</h5>
            <div className="flex justify-center items-center w-full h-full relative">
                <Doughnut data={data} options={options} ref={doughnutRef} />
                <h5
                    className={`hidden md:block absolute italic pointer-events-none text-center font-semibold md:top-[calc(50% - ${centerY})] -translate-y-1/2 text-lg md:text-2xl`}
                >
                    Total balance: <br />${`${thousandSeparator(balance)}`}
                </h5>
            </div>
        </section>
    );
};

export default BalancePie;
