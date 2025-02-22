import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button } from "@heroui/react";
import Autocomp from "./autocomplete";
import axios from "axios";
import { useFormik } from "formik";

const columns = [
  {
    key: "name",
    label: "İşçi",
  },
  {
    key: "note",
    label: "Xüsusi qeyd",
  },
  {
    key: "action",
    label: "Əməliyyat",
  },
];

function Form({ rows, setRows, allData, setAllData, deleteRow }) {
  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      order: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const [selectedWorker, setSelectedWorker] = useState(null);

  async function fetchData() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    const data = res.data.map((user, index) => ({
      key: user.id.toString(),
      name: user.name,
      note: "",
      order: index + 1,
    }));
    setAllData(data);
    setRows([data[0]]);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handlePreview = (worker) => {
    // console.log(worker);

    const lastDigit = worker.key.slice(-1);
    let message = "";

    if (lastDigit === "1") message = "Erize";
    else if (lastDigit === "2") message = "Meraba";
    else if (lastDigit === "3") message = "Nasilsin";
    else message = worker.note || "Not yok";

    setSelectedWorker({
      id: worker.key,
      name: worker.name,
      message,
    });
  };
  // console.log(selectedWorker);

  return (
    <div className='flex flex-col relative gap-4 w-full text-black bg-white rounded-2xl mt-6'>
      <div className='p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded-large shadow-small w-full'>
        <Table aria-label='Example table with dynamic content' className='min-w-full h-auto table-auto w-full'>
          <TableHeader
            columns={[
              // { key: "index", label: "Sıra" },
              ...columns,
            ]}
          >
            {(column) => (
              <TableColumn key={column.key} className='text-center'>
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={rows}>
            {(item, index) => (
              <TableRow key={item.key}>
                {(column) => (
                  <TableCell className=''>
                    {column == "index" ? (
                      index + 1
                    ) : column == "name" ? (
                      <Autocomp
                        allData={allData}
                        index={index}
                        setAllData={setAllData}
                        selectedWorker={selectedWorker}
                        setSelectedWorker={setSelectedWorker}
                      />
                    ) : column == "note" ? (
                      <Input label='Xususi qeyd' className='bg-gray-200 max-h-10 max-w-32 text-xs' type='text' />
                    ) : (
                      <div className='flex justify-evenly'>
                        <Button onPress={() => handlePreview(item)} className='bg-green-600 text-white rounded-xl mt-0'>
                          Baxis
                        </Button>
                        <Button onPress={() => deleteRow(item.key)} className='bg-red-600 text-white rounded-xl mt-0'>
                          Sil
                        </Button>
                      </div>
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {selectedWorker && (
        <div className='mt-4 p-4 border rounded bg-gray-100'>
          <h3 className='font-bold text-lg'>İşçi Detayları</h3>
          <p>
            <strong>ID:</strong> {selectedWorker.id}
          </p>
          <p>
            <strong>Ad:</strong> {selectedWorker.name}
          </p>
          <p>
            <strong>Mesaj:</strong> {selectedWorker.message}
          </p>
        </div>
      )}
    </div>
  );
}

export default Form;
