import { useState } from "react";
import "./App.css";
import Form from "./components/form";
import { Button } from "@heroui/react";

function App() {
  const [allData, setAllData] = useState([]);
  const [rows, setRows] = useState([]);

  const addRow = () => {
    if (rows.length < allData.length) {
      setRows((prev) => [...prev, allData[prev.length]]);
    }
  };

  const deleteRow = (key) => {
    setRows((prev) => prev.filter((row) => row.key !== key));
  };

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mt-4 text-white">
            İşçi Məlumatları
          </h1>
          <Button
            onPress={() => addRow()}
            className="px-6 py-2 text-base bg-indigo-500 hover:bg-slate-500 rounded-lg"
          >
            Əlavə Et
          </Button>
        </div>
        <Form
          allData={allData}
          rows={rows}
          setRows={setRows}
          addRow={addRow}
          setAllData={setAllData}
          deleteRow={deleteRow}
        />
      </div>
    </>
  );
}

export default App;
