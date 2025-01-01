import React from 'react';
import { ArrowDownToLine, Printer } from 'lucide-react';
import "jspdf-autotable";
import { useSortableData } from '../hooks/useSortableData';
import { useFilterableData } from '../hooks/useFilterableData';
import { useDraggableColumns } from '../hooks/useDraggableColumns';
import { formatDate, formatCurrency, formatNumber } from '../utils/formatters';
import { exportToExcel, exportToPDF } from '../utils/exportHelpers';
import { sumBy } from '../utils/dataManipulation';
import { TableProps, Column, TableSize } from '../types/TableProps';

const sizeClasses: Record<TableSize, string> = {
  xs: "text-xs [&>_tbody>*_td]:p-0.5 [&>_tbody>*_th]:p-0.5",
  s: "text-sm [&>_tbody>*_td]:p-1   [&>_tbody>*_th]:p-1 ",
  m: "text-base [&>_tbody>*_td]:p-1.5 [&>_tbody>*_th]:p-1.5",
  l: "text-lg [&>_tbody>*_td]:p-2   [&>_tbody>*_th]:p-2 ",
  xl: "text-xl [&>_tbody>*_td]:p-2.5 [&>_tbody>*_th]:p-2.5",
};

const Table: React.FC<TableProps> = ({
  tableConfig = { data: [], columns: [] },
  isSerialized = true,
  size = "m",
  header = true,
  title = "",
  printSize = "A4 landscape",
  sum = false
}) => {
  const { data, columns: initialColumns } = tableConfig;
  const baseClasses = "border-collapse border w-full [&>*_th]:border [&>*_td]:border";
  const sizeClass = sizeClasses[size];
  const tableClasses = baseClasses + " " + sizeClass;

  const { items: sortedData, requestSort, sortConfig } = useSortableData(data);
  const { filteredItems, setFilter, filterValues } = useFilterableData(sortedData, initialColumns.map(col => col.key));
  const { columns: draggableColumns, handleDragStart, handleDragOver, handleDrop } = useDraggableColumns(initialColumns);

  const shouldMergeCell = (rowIndex: number, colIndex: number): boolean => {
    if (rowIndex === 0) return true;

    const currentColumn = draggableColumns[colIndex];
    const currentValue = filteredItems[rowIndex][currentColumn.key];
    const previousValue = filteredItems[rowIndex - 1][currentColumn.key];

    // Check if any previous column is not merged
    for (let i = 0; i < colIndex; i++) {
      const prevColKey = draggableColumns[i].key;
      if (
        filteredItems[rowIndex][prevColKey] !==
        filteredItems[rowIndex - 1][prevColKey]
      ) {
        return true; // Don't merge with previous row if any previous column is not merged
      }
    }

    return currentValue !== previousValue;
  };

  const calculateRowSpan = (rowIndex: number, colIndex: number): number => {
    const currentColumn = draggableColumns[colIndex];
    const currentValue = filteredItems[rowIndex][currentColumn.key];
    let rowSpan = 1;

    // Only calculate rowspan if all previous columns are merged
    let canMerge = true;
    for (let i = rowIndex + 1; i < filteredItems.length; i++) {
      // Check all previous columns
      for (let j = 0; j < colIndex; j++) {
        const prevColKey = draggableColumns[j].key;
        if (
          filteredItems[i][prevColKey] !== filteredItems[rowIndex][prevColKey]
        ) {
          canMerge = false;
          break;
        }
      }

      if (!canMerge || filteredItems[i][currentColumn.key] !== currentValue) {
        break;
      }
      rowSpan++;
    }

    return rowSpan;
  };

  const handleExportToExcel = () => {
    exportToExcel(filteredItems, draggableColumns, title || 'table-data');
  };

  const handleExportToPDF = () => {
    exportToPDF(filteredItems, draggableColumns, title || 'table-data');
  };

  const getCellClass = (dataType?: string): string => {
    let cellClass = "";
    if (["int", "float", "currency", "number"].includes(dataType || "")) {
      cellClass = "text-right";
    } else if (["date", "datetime"].includes(dataType || "")) {
      cellClass = "text-center";
    }
    return cellClass;
  };

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
              onChange={(e) => setFilter('global', e.target.value)}
            />
            <button
              onClick={handleExportToExcel}
              title="Export to Excel"
              className="h-8 w-8 rounded bg-success flex justify-center items-center"
            >
              <ArrowDownToLine size={16} />
            </button>
            <button
              onClick={handleExportToPDF}
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
            {draggableColumns.map((column, index) => (
              <th
                key={column.key}
                draggable
                onDragStart={handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={handleDrop(index)}
                className="cursor-move"
                onClick={() => requestSort(column.key)}
              >
                {column.header}
                {sortConfig?.key === column.key && (
                  <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                )}
              </th>
            ))}
          </tr>
          <tr className="table-col-search">
            {isSerialized && <th></th>}
            {initialColumns.map((column) => (
              <th key={`search-${column.key}`} className="!p-0.5">
                <input
                  type="search"
                  placeholder={`Search ${column.header}`}
                  className="!px-1 p-0.5 w-full font-light bg-base-100"
                  onChange={(e) => setFilter(column.key, e.target.value)}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {isSerialized && <td>{rowIndex + 1}</td>}
              {draggableColumns.map((column) => {
                const shouldRender = shouldMergeCell(rowIndex, draggableColumns.indexOf(column));
                if (!shouldRender) return null;

                const rowSpan = calculateRowSpan(rowIndex, draggableColumns.indexOf(column));
                let value = row[column.key];

                let formattedValue = value;

                if (column.dataType === 'date' || column.dataType === 'datetime') {
                  formattedValue = formatDate(value);
                } else if (column.dataType === 'currency') {
                  formattedValue = formatCurrency(Number(value));
                } else if (column.dataType === 'int' || column.dataType === 'float') {
                  formattedValue = formatNumber(Number(value));
                }

                return (
                  <td
                    key={`cell-${rowIndex}-${column.key}`}
                    rowSpan={rowSpan}
                    className={getCellClass(column.dataType)}
                  >
                    {formattedValue}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
        {sum && (
          <tfoot>
            <tr className="*:bg-base-200 text-right font-bold">
              {isSerialized && <td></td>}
              {draggableColumns.map((col) => (
                <td key={col.key}>
                  {col.sum && sumBy(filteredItems, col.key as keyof typeof filteredItems[0])}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default Table;

