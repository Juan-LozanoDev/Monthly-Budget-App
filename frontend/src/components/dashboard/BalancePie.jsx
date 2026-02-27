import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const BalancePie = ({ balance, incomes, expenses, investments }) => {
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
                hoverOffset: 20,
                rotation: 270,
            },
        ],
    };

    const options = {
        plugins: {
            layout: {
                padding: 30,
                autoPadding: false,
            },
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
            subtitle: {
                display: true,
                text: `Total balance $${balance}`,
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
        },
    };

    return (
        <section className="p-4 w-full justify-center items-center bg-zinc-50 shadow-lg shadow-zinc-300 rounded-lg">
            <h5 className=" text-slate-500 font-semibold">Financial Overview</h5>
            <div className="flex justify-center items-center w-full h-full">
                <Doughnut data={data} options={options} />
            </div>
            
        </section>
    );
};

export default BalancePie;
