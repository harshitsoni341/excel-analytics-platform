import { useEffect, useState } from "react";
import API from "../api";
import { Bar, Line, Pie } from "react-chartjs-2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

const Charts = () => {
  const [data, setData] = useState([]);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [type, setType] = useState("bar");

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get("/files/history");
      if (res.data.length > 0) setData(res.data[0].data);
    };
    fetchData();
  }, []);

  const keys = data.length ? Object.keys(data[0]) : [];

  const chartData = {
    labels: data.map((item) => item[xAxis]),
    datasets: [
      {
        label: yAxis,
        data: data.map((item) => item[yAxis]),
        backgroundColor: "rgba(59,130,246,0.6)",
        borderColor: "rgba(59,130,246,1)",
        borderWidth: 1,
      },
    ],
  };

  const download = async (format) => {
    const canvasElement = document.getElementById("chart-container");
    const canvas = await html2canvas(canvasElement);

    if (format === "png") {
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = "chart.png";
      link.click();
    } else if (format === "pdf") {
      const pdf = new jsPDF();
      pdf.addImage(canvas.toDataURL(), "PNG", 10, 10, 180, 100);
      pdf.save("chart.pdf");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Generate Charts</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <select onChange={(e) => setXAxis(e.target.value)} className="border p-2 rounded">
          <option value="">Select X-Axis</option>
          {keys.map((k) => <option key={k}>{k}</option>)}
        </select>

        <select onChange={(e) => setYAxis(e.target.value)} className="border p-2 rounded">
          <option value="">Select Y-Axis</option>
          {keys.map((k) => <option key={k}>{k}</option>)}
        </select>

        <select onChange={(e) => setType(e.target.value)} className="border p-2 rounded">
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="pie">Pie</option>
        </select>
      </div>

      <div id="chart-container" className="bg-gray-50 p-4 rounded shadow-sm">
        {xAxis && yAxis && type === "bar" && <Bar data={chartData} />}
        {xAxis && yAxis && type === "line" && <Line data={chartData} />}
        {xAxis && yAxis && type === "pie" && <Pie data={chartData} />}
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => download("png")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download PNG
        </button>
        <button
          onClick={() => download("pdf")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Charts;
