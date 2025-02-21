import React, { useState } from 'react'
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
    Autocomplete,
    AutocompleteItem
} from "@heroui/react";


  const rows = [
    {
      key: "1",
      name: "Tony Reichert",
      role: "CEO",
      status: "Active",
    },
    {
      key: "2",
      name: "Zoey Lang",
      role: "Technical Lead",
      status: "Paused",
    },
    {
      key: "3",
      name: "Jane Fisher",
      role: "Senior Developer",
      status: "Active",
    },
  ];
  
  const columns = [
    {
      key: "name",
      label: "İşçi",
    },
    {
      key: "role",
      label: "Xüsusi qeyd",
    },
    {
      key: "status",
      label: "Əməliyyat",
    },
  ];
function Form() {
    const [openRow, setOpenRow] = useState(null)
  return (
    <div className='flex flex-col relative gap-4 w-full text-black bg-white rounded-2xl mt-6'>
        <div className='p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded-large shadow-small w-full'>
            <Table aria-label="Example table with dynamic content" className='min-w-full h-auto table-auto w-full'>
                <TableHeader columns={[{ key: "index", label: "Sıra" }, ...columns]}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={rows}>
                    {(item, index) => (
                    <TableRow key={item.key}>
                        <TableCell>{item.key}
                        </TableCell>
                        {columns.map((column) => (
              <TableCell key={column.key}>
                {column.key == "name" ? ( 
                  <Autocomplete
                    aria-label={`Worker selection for row ${index + 1}`} 
                    defaultItems={rows}
                    placeholder="İşçiler"
                    onOpenChange={(isOpen) => setOpenRow(isOpen ? index : null)}
                    className='bg-white max-w-xs'
                  >
                    {(rows) => <AutocompleteItem key={rows.key} className='bg-white text-black'>{rows.name}</AutocompleteItem>}
                  </Autocomplete>
                ) : (
                  item[column.key] 
                )}
              </TableCell>
            ))}
                    </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    </div>
  )
}

export default Form