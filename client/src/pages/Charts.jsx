import { useEffect, useState } from "react";
import API from "../api";
import { Bar, Line, Pie } from "react-chartjs-2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

const Charts = () => {
  const [files, setFiles] = useState([]);
  const [data, setData] = useState([]);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [type, setType] = useState("bar");

  useEffect(() => {
    API.get("/files/history").then((res) => {
      setFiles(res.data);
      if (res.data.length > 0) setData(res.data[0].data); // default latest file
    });
  }, []);

  const keys = data.length ? Object.keys(data[0]) : [];

  const chartData = {
    labels: data.map((item) => item[xAxis]),
    datasets: [
      {
        label: `${yAxis}`,
        data: data.map((item) => item[yAxis]),
        backgroundColor: "rgba(59,130,246,0.5)",
        borderColor: "rgba(59,130,246,1)",
        borderWidth: 1,
      },
    ],
  };

  const downloadChart = async (format) => {
    const chartCanvas = document.getElementById("chart-container");
    const canvas = await html2canvas(chartCanvas);

    if (format === "png") {
      const link = document.createElement("a");
      link.download = "chart.png";
      link.href = canvas.toDataURL();
      link.click();
    } else if (format === "pdf") {
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 10, 10, 180, 100);
      pdf.save("chart.pdf");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Chart Generator</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
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

      <div id="chart-container" className="bg-gray-50 p-4 rounded">
        {xAxis && yAxis && type === "bar" && <Bar data={chartData} />}
        {xAxis && yAxis && type === "line" && <Line data={chartData} />}
        {xAxis && yAxis && type === "pie" && <Pie data={chartData} />}
      </div>

      <div className="mt-4 flex gap-4">
        <button onClick={() => downloadChart("png")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Download PNG</button>
        <button onClick={() => downloadChart("pdf")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Download PDF</button>
      </div>
    </div>
  );
};

export default Charts;
