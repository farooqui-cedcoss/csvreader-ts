import React, { useState } from "react";
import * as XLSX from "xlsx";
import DataTable from "react-data-table-component";

interface DataInterface {
  [key: string]: string | number;
}

function GetSVCFile() {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState<DataInterface[]>([]);

  // process CSV data
  const processData = (dataString: any) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(
      /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
    );

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(
        /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
      );
      if (headers && row.length === headers.length) {
        const obj: any = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] === '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] === '"') d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter((x) => x).length > 0) {
          list.push(obj);
        }
      }
    }

    // prepare columns list from headers
    const columns1 = headers.map((c: any) => ({
      name: c,
      selector: c,
    }));

    setData(list);
    setColumns(columns1);
  };

  console.log("column", columns);
  console.log("data", data);

  // handle file upload
  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt: any) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, {});
      processData(data);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <h3>Read CSV file in React</h3>
      <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} />
      <DataTable pagination highlightOnHover columns={columns} data={data} />
    </div>
  );
}

export default GetSVCFile;
