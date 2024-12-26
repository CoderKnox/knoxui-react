import React from 'react';

const Table = ({ tableConfig = { data: [], columns: [] } }) => {
  const { data, columns } = tableConfig;

  // Add row counter if needed
  const dataWithCounter = data.map((row, index) => ({
    sr: index + 1,
    ...row,
  }));

  // Logic to calculate rowSpan for each cell
  const calculateRowSpans = (data, columns) => {
    const rowSpans = Array.from({ length: data.length }, () =>
      Array(columns.length).fill(1)
    );

    // Iterate columns (parent -> child relationship)
    for (let colIndex = 0; colIndex < columns.length; colIndex++) {
      for (let rowIndex = 1; rowIndex < data.length; rowIndex++) {
        const currentValue = data[rowIndex][columns[colIndex].key];
        const previousValue = data[rowIndex - 1][columns[colIndex].key];

        // If value matches, merge row by increasing previous rowSpan and marking current as 0
        if (currentValue === previousValue) {
          rowSpans[rowIndex - 1][colIndex]++;
          rowSpans[rowIndex][colIndex] = 0;
        }
      }
    }

    return rowSpans;
  };

  const rowSpans = calculateRowSpans(dataWithCounter, columns);

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          {columns.map((col) => (
            <th key={col.key} className="border border-gray-300 px-4 py-2 text-left">
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataWithCounter.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col, colIndex) => {
              if (rowSpans[rowIndex][colIndex] > 0) {
                return (
                  <td
                    key={col.key}
                    className="border border-gray-300 px-4 py-2"
                    rowSpan={rowSpans[rowIndex][colIndex]}
                  >
                    {row[col.key]}
                  </td>
                );
              }
              return null; // Skip rendering if rowSpan is 0
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
