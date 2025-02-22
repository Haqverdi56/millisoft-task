import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { useEffect, useState } from "react";

export default function Autocomp({ allData, index, setAllData, setSelectedWorker }) {
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [updatedRows, setUpdatedRows] = useState(allData);

  useEffect(() => {
    const numbers = allData.map(() => generateRandomNumber());
    setRandomNumbers(numbers);
    addRandomIdToRows(numbers);
    setAllData(updatedRows);
  }, []);

  function generateRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 90000) + 10000;
    const lastDigit = [1, 2, 3][Math.floor(Math.random() * 3)];
    return Math.floor(randomNumber / 10) * 10 + lastDigit;
  }
  const addRandomIdToRows = (numbers) => {
    const updatedRows = allData.map((row, index) => ({
      ...row,
      randomId: numbers[index],
    }));
    setUpdatedRows(updatedRows);
  };
  // console.log('randomNumbers:', randomNumbers);
  // console.log('updatedRows:', updatedRows);

  return (
    <>
      <Autocomplete
        aria-label={`Worker selection for row ${index + 1}`}
        className="max-w-xs bg-gray-200"
        defaultItems={updatedRows}
        placeholder="İşçiler"
        onSelect={(e)=>setSelectedWorker({
          id: e.currentTarget.value.split('-')[0],
          name: e.currentTarget.value.split('-')[1],
        })}
        // console.log(e.currentTarget.value.split('-'))
      >
        {(item, itemIndex) => (
          <AutocompleteItem
            key={item.key}
            textValue={String(item?.randomId + "-" + item.name)}
            className="bg-white text-black gap-0"
          >
            <span className="mr-1">{item?.randomId}</span>-
            <span className="ml-1">{item?.name}</span>
          </AutocompleteItem>
        )}
      </Autocomplete>
    </>
  );
}
