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

const YearlyTaskCount = ({taskCounts,year}) => {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Completed",
        data: taskCounts.map((month) => month.completed),
        backgroundColor: "#4caf50",
        borderColor: "#388e3c",
        borderWidth: 1,
      },
      {
        label: "Non-Completed",
        data: taskCounts.map((month) => month.nonCompleted),
        backgroundColor: "#f44336",
        borderColor: "#d32f2f",
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
        text: `Task Counts for Year ${year}`,
      },
    },
  };

  return <Bar  data={data} options={options} />;
};

export default YearlyTaskCount;
