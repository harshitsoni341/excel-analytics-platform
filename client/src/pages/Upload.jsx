import { useState } from "react";
import API from "../api";
import * as XLSX from "xlsx";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const uploaded = e.target.files[0];
    setFile(uploaded);
    setMessage("");

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);
      setPreview(data.slice(0, 5)); // Preview first 5 rows
    };
    reader.readAsBinaryString(uploaded);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await API.post("/files/upload", formData);
      setMessage("✅ File uploaded successfully!");
    } catch (err) {
      setMessage("❌ Upload failed. Try again.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Upload Excel File</h2>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileChange}
        className="mb-4 w-full border px-3 py-2 rounded"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload to Server
      </button>

      {message && <p className="mt-4 font-semibold">{message}</p>}

      {preview.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h3 className="font-semibold mb-2">Preview (First 5 Rows)</h3>
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                {Object.keys(preview[0]).map((key) => (
                  <th key={key} className="border px-2 py-1">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {preview.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((val, j) => (
                    <td key={j} className="border px-2 py-1">{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Upload;
