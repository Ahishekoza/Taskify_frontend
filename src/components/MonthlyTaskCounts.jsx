/* eslint-disable react/prop-types */
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  

const MonthlyTaskCounts = ({taskCounts,year,month}) => {
    const data = {
        labels: ["Completed", "Non-Completed"],
        datasets: [
          {
            label: "Tasks",
            data: [taskCounts.completed, taskCounts.nonCompleted],
            backgroundColor: ["#4caf50", "#f44336"], // Green for completed, Red for non-completed
            borderColor: ["#388e3c", "#d32f2f"],
            borderWidth: 1,
          },
        ],
      };
    
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: `Task Counts for Month ${month}/${year}`,
          },
        },
      };
  return (
    <Bar data={data} options={options} />
  )
}

export default MonthlyTaskCounts