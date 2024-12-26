"use client";

import { useState } from "react";
import { ArrowDownToLine, Printer } from "lucide-react";
import { utils as XLSXUtils, writeFile } from "xlsx";
import "jspdf-autotable";

const sizeClasses = {
  xs: "text-xs [&>_tbody>*_td]:p-0.5 [&>_tbody>*_th]:p-0.5",
  s: "text-sm [&>_tbody>*_td]:p-1   [&>_tbody>*_th]:p-1 ",
  m: "text-base [&>_tbody>*_td]:p-1.5 [&>_tbody>*_th]:p-1.5",
  l: "text-lg [&>_tbody>*_td]:p-2   [&>_tbody>*_th]:p-2 ",
  xl: "text-xl [&>_tbody>*_td]:p-2.5 [&>_tbody>*_th]:p-2.5",
};

function Table({
  tableConfig = { data: [], columns: [] },
  isSerialized = true,
  size = "m",
  header = true,
  title = "",
  printSize="A4 landscape",
  sum=false
}) {
  
  const { data, columns: initialColumns } = tableConfig;
  const [columns, setColumns] = useState(initialColumns);
  const [filteredData, setFilteredData] = useState(data);
  const [searchTerms, setSearchTerms] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [globalSearch, setGlobalSearch] = useState("");
  const baseClasses = "border-collapse border w-full [&>*_th]:border [&>*_td]:border";
  const sizeClass = sizeClasses[size];
  const tableClasses = baseClasses + " " + sizeClass;

  const handleDragStart = (index) => (event) => {
    event.dataTransfer.setData("columnIndex", index.toString());
  };

  const handleDrop = (index) => (event) => {
    const fromIndex = Number(event.dataTransfer.getData("columnIndex"));
    const toIndex = index;

    if (fromIndex !== toIndex) {
      const updatedColumns = [...columns];
      const [movedColumn] = updatedColumns.splice(fromIndex, 1);
      updatedColumns.splice(toIndex, 0, movedColumn);
      setColumns(updatedColumns);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSearch = (key, value) => {
    setSearchTerms((prev) => ({ ...prev, [key]: value }));
    filterData(globalSearch, { ...searchTerms, [key]: value });
  };

  const handleGlobalSearch = (value) => {
    setGlobalSearch(value);
    filterData(value, searchTerms);
  };

  const filterData = (globalTerm, columnTerms) => {
    const filtered = data.filter(
      (row) =>
        columns.some((col) =>
          row[col.key]
            ?.toString()
            .toLowerCase()
            .includes(globalTerm.toLowerCase())
        ) &&
        columns.every((col) => {
          if (!columnTerms[col.key]) return true;
          return row[col.key]
            ?.toString()
            .toLowerCase()
            .includes(columnTerms[col.key].toLowerCase());
        })
    );
    setFilteredData(filtered);
  };

  const handleSort = (key, dataType) => {
    const newDirection =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";

    const sortedData = [...filteredData].sort((a, b) => {
      let valA = a[key];
      let valB = b[key];

      if (dataType === "int" || dataType === "float") {
        valA = parseFloat(valA) || 0;
        valB = parseFloat(valB) || 0;
      } else if (dataType === "date" || dataType === "datetime") {
        valA = new Date(valA) || 0;
        valB = new Date(valB) || 0;
      } else {
        valA = valA?.toString().toLowerCase() || "";
        valB = valB?.toString().toLowerCase() || "";
      }

      if (valA < valB) return newDirection === "asc" ? -1 : 1;
      if (valA > valB) return newDirection === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredData(sortedData);
    setSortConfig({ key, direction: newDirection });
  };

  const shouldMergeCell = (rowIndex, colIndex) => {
    if (rowIndex === 0) return true;

    const currentColumn = columns[colIndex];
    const currentValue = filteredData[rowIndex][currentColumn.key];
    const previousValue = filteredData[rowIndex - 1][currentColumn.key];

    // Check if any previous column is not merged
    for (let i = 0; i < colIndex; i++) {
      const prevColKey = columns[i].key;
      if (
        filteredData[rowIndex][prevColKey] !==
        filteredData[rowIndex - 1][prevColKey]
      ) {
        return true; // Don't merge with previous row if any previous column is not merged
      }
    }

    return currentValue !== previousValue;
  };

  const calculateRowSpan = (rowIndex, colIndex) => {
    const currentColumn = columns[colIndex];
    const currentValue = filteredData[rowIndex][currentColumn.key];
    let rowSpan = 1;

    // Only calculate rowspan if all previous columns are merged
    let canMerge = true;
    for (let i = rowIndex + 1; i < filteredData.length; i++) {
      // Check all previous columns
      for (let j = 0; j < colIndex; j++) {
        const prevColKey = columns[j].key;
        if (
          filteredData[i][prevColKey] !== filteredData[rowIndex][prevColKey]
        ) {
          canMerge = false;
          break;
        }
      }

      if (!canMerge || filteredData[i][currentColumn.key] !== currentValue) {
        break;
      }
      rowSpan++;
    }

    return rowSpan;
  };

  const exportToExcel = () => {
    const headers = columns.map((col) => col.header);
    const rows = filteredData.map((row) =>
      columns.map((col) => row[col.key] || "")
    );

    const worksheet = XLSXUtils.aoa_to_sheet([headers, ...rows]);
    const workbook = XLSXUtils.book_new();
    XLSXUtils.book_append_sheet(workbook, worksheet, "Table Data");
    writeFile(workbook, `${title}.xlsx`);
  };

  const exportToPDF = () => {
    // Open a new window for printing
    const printWindow = window.open("", "");

    // Get the table HTML and exclude rows with 'table-col-search' class
    const table = document.querySelector("table").cloneNode(true); // Clone table to avoid modifying the original
    const searchRow = table.querySelector(".table-col-search");
    if (searchRow) searchRow.remove(); // Remove 'table-col-search' row

    // Fetch computed styles of the table and its children
    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules || [])
            .map((rule) => rule.cssText)
            .join("\n");
        } catch (error) {
          console.warn("Could not access stylesheet", styleSheet, error);
          return "";
        }
      })
      .join("\n");

    // Write the HTML and styles into the new window
    printWindow.document.write(
      "<html><head><title>Table Export to PDF</title>"
    );
    printWindow.document.write("<style>");
    printWindow.document.write(styles); // Inject styles
    printWindow.document.write(`
        @page { size: ${printSize}; }
        body { font-family: Arial, sans-serif; }
    `);
    printWindow.document.write("</style></head><body style='padding: 8px;'>");
    printWindow.document.write(`<h1>${title}</h1>`);
    printWindow.document.write(table.outerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    // Focus and print
    printWindow.focus();
    printWindow.print();
  };

  const calculateSums = () => {
    const sums = {};
    columns.forEach((column) => {
      const shouldSum =
        column.sum === true || (sum && column.sum !== false); // Check conditions

      if (shouldSum && (column.dataType === 'int' || column.dataType === 'float')) {
        sums[column.key] = data.reduce((acc, row) => {
          const value = row[column.key];
          return acc + (value || 0); // Add value if it exists
        }, 0);
      }
    });
    return sums;
  };
  const sums = calculateSums();

  return (
    <div className="bg-base-100">
      {header && (
        <div className="table-header p-2 flex justify-between border border-b-0 bg-base-200 rounded-t">
          <div className="font-semibold text-lg">
            {title && <div className="title">{title}</div>}
          </div>
          <div className="controls space-x-2 flex">
            <input
              type="search"
              placeholder="Global search"
              className="border rounded text-sm px-1.5 border-secondary outline-none focus:border-primary bg-base-100"
              onChange={(e) => handleGlobalSearch(e.target.value)}
            />
            <button
              onClick={exportToExcel}
              title="Export to Excel"
              className="h-8 w-8 rounded bg-success flex justify-center items-center"
            >
              <ArrowDownToLine size={16} />
            </button>
            <button
              onClick={exportToPDF}
              title="Print or Save as PDF"
              className="h-8 w-8 rounded bg-primary flex justify-center items-center"
            >
              <Printer size={16} />
            </button>
          </div>
        </div>
      )}
      <table className={tableClasses}>
        <thead className="*:bg-base-200">
          <tr className="*:p-0.5">
            {isSerialized && <th>#</th>}
            {columns.map((column, index) => (
              <th
                key={column.key}
                draggable
                onDragStart={handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={handleDrop(index)}
                className="cursor-move"
                onClick={() => handleSort(column.key, column.dataType)}
              >
                {column.header}
                {sortConfig.key === column.key && (
                  <span>{sortConfig.direction === "asc" ? " ↑" : " ↓"}</span>
                )}
              </th>
            ))}
          </tr>
          <tr className="table-col-search">
            {isSerialized && <th></th>}
            {columns.map((column) => (
              <th key={`search-${column.key}`} className="!p-0.5">
                <input
                  type="search"
                  placeholder={`Search ${column.header}`}
                  className="!px-1 p-0.5 w-full font-light bg-base-100"
                  onChange={(e) => handleSearch(column.key, e.target.value)}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {isSerialized && <td>{rowIndex + 1}</td>}
              {columns.map((column, colIndex) => {
                const shouldRender = shouldMergeCell(rowIndex, colIndex);
                if (!shouldRender) return null;

                const rowSpan = calculateRowSpan(rowIndex, colIndex);
                let tdValue = row[column.key];

                let cellClass = "";
                if (["int", "float"].includes(column.dataType)) {
                  cellClass = "text-right";
                  if(String(tdValue).includes(".")) {tdValue = tdValue.toFixed(2);};
                } else if (["date", "datetime"].includes(column.dataType)) {
                  cellClass = "text-center";
                }

                return (
                  <td
                    key={`cell-${rowIndex}-${column.key}`}
                    rowSpan={rowSpan}
                    className={cellClass}
                  >
                    {tdValue}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
        {Object.keys(sums).length > 0 && (
          <tfoot>
            <tr className="*:bg-base-200 text-right font-bold">
              {isSerialized && <td></td>}
              {columns.map((col) => (
                <td key={col.key}>
                  {sums[col.key] !== undefined ? (
                    col.dataType === 'float' || sums[col.key] ? sums[col.key].toFixed(2) : sums[col.key]
                  ) : (
                    ''
                  )}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

export default Table;
