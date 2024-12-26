"use client";

import React from "react";
import Button from "./Button";
import Radio from "./Radio";
import Input from "./Input";
import { FileDown } from "lucide-react";

export function PivotTable({ initialData }) {
  const sortData = (data, fields) => {
    return [...data].sort((a, b) => {
      for (let field of fields) {
        if (a[field] < b[field]) return -1;
        if (a[field] > b[field]) return 1;
      }
      return 0;
    });
  };

  const [data] = React.useState(initialData);
  const [values, setValues] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [aggregationType, setAggregationType] = React.useState("sum");
  const [draggedValue, setDraggedValue] = React.useState(null);
  const [swapValueColumns, setSwapValueColumns] = React.useState(false);

  const availableFields = React.useMemo(() => {
    const selectedFields = [...values, ...rows, ...columns];
    return [
      "buyer",
      "style",
      "orderNumber",
      "color",
      "orderQty",
      "pricePerPcs",
    ].filter((field) => !selectedFields.includes(field));
  }, [values, rows, columns]);

  const handleDragStart = (e, field) => {
    e.dataTransfer.setData("field", field);
  };

  const handleValueDragStart = (e, value) => {
    setDraggedValue(value);
    e.dataTransfer.setData("valueField", value);
  };

  const handleValueDragOver = (e, targetValue) => {
    if (draggedValue && draggedValue !== targetValue) {
      e.preventDefault();
    }
  };

  const handleValueDrop = (e, targetValue) => {
    e.preventDefault();
    const sourceValue = draggedValue;
    if (sourceValue && sourceValue !== targetValue) {
      const newValues = [...values];
      const sourceIndex = newValues.indexOf(sourceValue);
      const targetIndex = newValues.indexOf(targetValue);
      newValues.splice(sourceIndex, 1);
      newValues.splice(targetIndex, 0, sourceValue);
      setValues(newValues);
    }
    setDraggedValue(null);
  };

  const handleDrop = (e, targetSection) => {
    e.preventDefault();
    const field = e.dataTransfer.getData("field");

    setValues(values.filter((f) => f !== field));
    setRows(rows.filter((f) => f !== field));
    setColumns(columns.filter((f) => f !== field));

    switch (targetSection) {
      case "values":
        if (!values.includes(field)) setValues([...values, field]);
        break;
      case "rows":
        if (!rows.includes(field)) setRows([...rows, field]);
        break;
      case "columns":
        if (!columns.includes(field)) setColumns([...columns, field]);
        break;
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeField = (field, section) => {
    switch (section) {
      case "values":
        setValues(values.filter((f) => f !== field));
        break;
      case "rows":
        setRows(rows.filter((f) => f !== field));
        break;
      case "columns":
        setColumns(columns.filter((f) => f !== field));
        break;
    }
  };

  const calculateValue = (groupedData, valueField, columnValue) => {
    if (!groupedData) return 0;

    const relevantData = columnValue
      ? groupedData.filter((item) =>
          columns.every((col) => item[col] === columnValue)
        )
      : groupedData;

    if (aggregationType === "sum") {
      return relevantData.reduce(
        (sum, item) => sum + (item[valueField] || 0),
        0
      );
    }
    return relevantData.length;
  };

  const getUniqueColumnValues = (colField) => {
    return [...new Set(data.map((item) => item[colField]))];
  };

  const groupData = () => {
    const sortedData = sortData(data, rows);
    return sortedData.reduce((acc, item) => {
      const rowKey = rows.map((field) => item[field]).join("-");
      if (!acc[rowKey]) {
        acc[rowKey] = [];
      }
      acc[rowKey].push(item);
      return acc;
    }, {});
  };

  const shouldRenderCell = (rowIndex, cellIndex, uniqueRows) => {
    if (rowIndex === 0) return true;

    const currentRow = uniqueRows[rowIndex].split("-");
    const previousRow = uniqueRows[rowIndex - 1].split("-");

    // Check if all parent values match
    for (let i = 0; i <= cellIndex; i++) {
      if (currentRow[i] !== previousRow[i]) return true;
    }

    return false;
  };

  const getRowSpan = (rowIndex, cellIndex, uniqueRows) => {
    const currentRow = uniqueRows[rowIndex].split("-");
    let span = 1;

    for (let i = rowIndex + 1; i < uniqueRows.length; i++) {
      const nextRow = uniqueRows[i].split("-");
      let shouldSpan = true;

      // Check if all parent values match
      for (let j = 0; j <= cellIndex; j++) {
        if (nextRow[j] !== currentRow[j]) {
          shouldSpan = false;
          break;
        }
      }

      if (shouldSpan) {
        span++;
      } else {
        break;
      }
    }

    return span;
  };

  const renderTable = () => {
    const groupedData = groupData();
    const uniqueRows = [
      ...new Set(
        data.map((item) => rows.map((field) => item[field]).join("-"))
      ),
    ];
    const sortedUniqueRows = sortData(
      uniqueRows.map((row) => {
        const fields = row.split("-");
        return rows.reduce((obj, field, index) => {
          obj[field] = fields[index];
          return obj;
        }, {});
      }),
      rows
    ).map((row) => rows.map((field) => row[field]).join("-"));
    const columnValues =
      columns.length > 0 ? getUniqueColumnValues(columns[0]) : [];

    // Group rows by their parent values
    const groupedRows = sortedUniqueRows.reduce((acc, row) => {
      const parentKey = row.split("-").slice(0, -1).join("-");
      if (!acc[parentKey]) {
        acc[parentKey] = [];
      }
      acc[parentKey].push(row);
      return acc;
    }, {});

    return (
      <div className="overflow-x-auto">
        <div className="mb-4 flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={swapValueColumns}
              onChange={(e) => setSwapValueColumns(e.target.checked)}
              className="rounded bg-base-300"
            />
            Swap values and columns in header
          </label>
        </div>
        <table className="min-w-full bg-base-300 [&>*_th]:border [&>*_td]:border [&>*_td]:p-1">
          <thead className="[&>*>th]:bg-base-200">
            <tr>
              {rows.map((field) => (
                <th key={field} rowSpan={columns.length > 0 ? 2 : 1}>
                  {field}
                </th>
              ))}
              {columns.length > 0 &&
                !swapValueColumns &&
                values.map((valueField) => (
                  <th
                    key={valueField}
                    colSpan={columnValues.length}
                    draggable
                    onDragStart={(e) => handleValueDragStart(e, valueField)}
                    onDragOver={(e) => handleValueDragOver(e, valueField)}
                    onDrop={(e) => handleValueDrop(e, valueField)}
                    className="cursor-move hover:bg-base-300"
                  >
                    {valueField}
                  </th>
                ))}
              {columns.length > 0 &&
                swapValueColumns &&
                columnValues.map((colValue) => (
                  <th key={colValue} colSpan={values.length}>
                    {colValue}
                  </th>
                ))}
              {columns.length === 0 &&
                values.map((valueField) => (
                  <th
                    key={valueField}
                    rowSpan={2}
                    draggable
                    onDragStart={(e) => handleValueDragStart(e, valueField)}
                    onDragOver={(e) => handleValueDragOver(e, valueField)}
                    onDrop={(e) => handleValueDrop(e, valueField)}
                    className="cursor-move hover:bg-gray-700"
                  >
                    {valueField}
                  </th>
                ))}
            </tr>
            {columns.length > 0 && (
              <tr>
                {!swapValueColumns
                  ? values.map((valueField) =>
                      columnValues.map((colValue) => (
                        <th key={`${valueField}-${colValue}`}>{colValue}</th>
                      ))
                    )
                  : columnValues.map((colValue) =>
                      values.map((valueField) => (
                        <th
                          key={`${colValue}-${valueField}`}
                          draggable
                          onDragStart={(e) =>
                            handleValueDragStart(e, valueField)
                          }
                          onDragOver={(e) => handleValueDragOver(e, valueField)}
                          onDrop={(e) => handleValueDrop(e, valueField)}
                          className="cursor-move hover:bg-gray-700"
                        >
                          {valueField}
                        </th>
                      ))
                    )}
              </tr>
            )}
          </thead>

          <tbody>
            {Object.entries(groupedRows).map(([parentKey, groupRows]) => (
              <React.Fragment key={parentKey}>
                {groupRows.map((row, rowIndex) => {
                  const rowData = groupedData[row];
                  const cells = row.split("-");

                  return (
                    <tr key={row}>
                      {cells.map((cell, cellIndex) => {
                        if (!shouldRenderCell(rowIndex, cellIndex, groupRows)) {
                          return null;
                        }

                        const rowSpan = getRowSpan(
                          rowIndex,
                          cellIndex,
                          groupRows
                        );
                        return (
                          <td key={cellIndex} rowSpan={rowSpan}>
                            {cell}
                          </td>
                        );
                      })}
                      {columns.length > 0
                        ? !swapValueColumns
                          ? values.map((valueField) =>
                              columnValues.map((colValue) => (
                                <td key={`${valueField}-${colValue}`}>
                                  {calculateValue(
                                    rowData,
                                    valueField,
                                    colValue
                                  )}
                                </td>
                              ))
                            )
                          : columnValues.map((colValue) =>
                              values.map((valueField) => (
                                <td key={`${colValue}-${valueField}`}>
                                  {calculateValue(
                                    rowData,
                                    valueField,
                                    colValue
                                  )}
                                </td>
                              ))
                            )
                        : values.map((valueField) => (
                            <td key={valueField}>
                              {calculateValue(rowData, valueField)}
                            </td>
                          ))}
                    </tr>
                  );
                })}
                <tr className="bg-gray-700 font-bold">
                  {rows.map(
                    (_, index) =>
                      index === rows.length - 1 && (
                        <td key={index} colSpan={rows.length}>
                          Sum
                        </td>
                      )
                  )}
                  {columns.length > 0
                    ? !swapValueColumns
                      ? values.map((valueField) =>
                          columnValues.map((colValue) => (
                            <td key={`${valueField}-${colValue}`}>
                              {groupRows.reduce(
                                (sum, row) =>
                                  sum +
                                  calculateValue(
                                    groupedData[row],
                                    valueField,
                                    colValue
                                  ),
                                0
                              )}
                            </td>
                          ))
                        )
                      : columnValues.map((colValue) =>
                          values.map((valueField) => (
                            <td key={`${colValue}-${valueField}`}>
                              {groupRows.reduce(
                                (sum, row) =>
                                  sum +
                                  calculateValue(
                                    groupedData[row],
                                    valueField,
                                    colValue
                                  ),
                                0
                              )}
                            </td>
                          ))
                        )
                    : values.map((valueField) => (
                        <td key={valueField}>
                          {groupRows.reduce(
                            (sum, row) =>
                              sum +
                              calculateValue(groupedData[row], valueField),
                            0
                          )}
                        </td>
                      ))}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-2">
      {/* Pivot fields blocks */}
      <div className="bg-base-100 rounded">
        {/* Fields blocks */}
        <div className="flex space-x-2 w-full overflow-auto">
          {/* Values */}
          <div className="border rounded bg-base-200 w-full">
            <h3 className="font-semibold p-1 text-center w-full bg-base-300 border-b">Values</h3>
            <div className="h-48 overflow-y-auto p-2" onDrop={(e) => handleDrop(e, 'values')} onDragOver={handleDragOver}>
              <div className="flex w-full pb-2 space-x-2">
                <Radio
                  checked={aggregationType === "sum"}
                  onChange={() => setAggregationType("sum")}
                  label={"SUM"}
                  isButton={true}
                  size="sm"
                />
                <Radio
                  checked={aggregationType === "count"}
                  onChange={() => setAggregationType("count")}
                  label={"COUNT"}
                  isButton={true}
                  size="sm"
                />
              </div>
              <div>
                {values.map((field) => (
                  <div
                    key={field}
                    draggable
                    className="bg-base-100 border p-2 mb-1 rounded flex justify-between items-center cursor-move hover:shadow-lg duration-200"
                    onDragStart={(e) => handleDragStart(e, field)}
                  >
                    <span>{field}</span>
                    <button
                      onClick={() => removeField(field, "values")}
                      className="text-error hover:text-warning"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Rows */}
          <div className="border rounded bg-base-200 w-full">
            <h3 className="font-semibold p-1 text-center w-full bg-base-300 border-b">Rows</h3>
            <div className="overflow-y-auto h-48 p-2" onDrop={(e) => handleDrop(e, 'rows')} onDragOver={handleDragOver}>
              {rows.map((field) => (
                <div
                  key={field}
                  className="bg-base-100 border p-2 mb-1 rounded flex justify-between items-center cursor-move hover:shadow-lg duration-200"
                  draggable // Corrected dragable to draggable
                  onDragStart={(e) => handleDragStart(e, field)}
                >
                  <span>{field}</span>
                  <button onClick={() => removeField(field, "rows")} className="text-error hover:text-warning">×</button>
                </div>
              ))}
            </div>
          </div>
          {/* Columns */}
          <div className="border rounded bg-base-200 w-full">
            <h3 className="font-semibold p-1 text-center w-full bg-base-300 border-b">
              Columns
            </h3>
            <div className="overflow-y-auto h-48 p-2" onDrop={(e) => handleDrop(e, 'columns')} onDragOver={handleDragOver}>
              {columns.map((field) => (
                <div
                  key={field}
                  className="bg-base-100 shadow cursor-move p-2 mb-1 rounded flex justify-between items-center hover:shadow-lg duration-200"
                  draggable
                  onDragStart={(e) => handleDragStart(e, field)}
                >
                  <span>{field}</span>
                  <button
                    onClick={() => removeField(field, "columns")}
                    className="text-error hover:text-warning"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* Available Fields */}
          <div className="border rounded bg-base-200 w-full">
            <h3 className="font-semibold p-1 text-center w-full bg-base-300 border-b">Available Fields</h3>
            <div className="overflow-y-auto h-48 p-2">
              {availableFields.map((field) => (
                <div
                  key={field}
                  draggable
                  onDragStart={(e) => handleDragStart(e, field)}
                  className="bg-base-100 shadow p-2 mb-1 rounded cursor-move hover:bg-primary duration-500 transition-colors"
                >
                  {field}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================= */}
      <div className="border rounded bg-base-200">
        {/* Table header bar */}
        <div className="p-2 flex justify-between items-center">
            <h2 className="font-semibold text-lg">Pivot Table Title</h2>
            <div className="flex join space-x- *:!rounded-none">
              {/* Global Search */}
              <Input color='secondary' placeholder="Global Search" title='Real time search in table' className={'rounded-none'}/>
              {/* Export buttons */}
              <Button title='Export to excel' color="success" className="py-2.5"><FileDown size='16' /></Button>
              <Button title='Export to PDF' color="error" className="py-2.5"><FileDown size='16' /></Button>
            </div>
        </div>

        {values.length > 0 && rows.length > 0 && (


          <div className="p-2">
            <div className="flex justify-between mb-4">
              <input
                type="text"
                placeholder="Search in table..."
                className="px-4 py-2 border rounded text-white"
              />
              <div className="space-x-2">
                <button className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700">
                  Export To PDF
                </button>
                <button className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700">
                  Export To Excel
                </button>
              </div>
            </div>
            {renderTable()}
          </div>
        )}
      </div>
    </div>
  );
}
