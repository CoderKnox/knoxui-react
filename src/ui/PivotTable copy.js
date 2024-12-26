'use client'
// V0.1

import React from 'react'

export default function PivotTable() {
  const initialData = [
    { buyer: 'Zara', style: 'XYZ', orderNumber: 'OD001', color: 'Red', orderQty: 1000, pricePerPcs: 200 },
    { buyer: 'Zara', style: 'XYZ', orderNumber: 'OD002', color: 'Blue', orderQty: 1000, pricePerPcs: 200 },
    { buyer: 'Zara', style: 'SDF', orderNumber: 'OD003', color: 'White', orderQty: 800, pricePerPcs: 300 },
    { buyer: 'H&M', style: 'SDF', orderNumber: 'OD004', color: 'White', orderQty: 800, pricePerPcs: 400 },
    { buyer: 'Lindex', style: 'XXY', orderNumber: 'OD005', color: 'Black', orderQty: 800, pricePerPcs: 400 },
  ]

  const [data] = React.useState(initialData)
  const [values, setValues] = React.useState([])
  const [rows, setRows] = React.useState([])
  const [columns, setColumns] = React.useState([])
  const [aggregationType, setAggregationType] = React.useState('sum')
  const [draggedValue, setDraggedValue] = React.useState(null)
  const [swapValueColumns, setSwapValueColumns] = React.useState(false)

  const availableFields = [
    'buyer', 'style', 'orderNumber', 'color', 'orderQty', 'pricePerPcs'
  ]

  const handleDragStart = (e, field) => {
    e.dataTransfer.setData('field', field)
  }

  const handleValueDragStart = (e, value) => {
    setDraggedValue(value)
    e.dataTransfer.setData('valueField', value)
  }

  const handleValueDragOver = (e, targetValue) => {
    if (draggedValue && draggedValue !== targetValue) {
      e.preventDefault()
    }
  }

  const handleValueDrop = (e, targetValue) => {
    e.preventDefault()
    const sourceValue = draggedValue
    if (sourceValue && sourceValue !== targetValue) {
      const newValues = [...values]
      const sourceIndex = newValues.indexOf(sourceValue)
      const targetIndex = newValues.indexOf(targetValue)
      newValues.splice(sourceIndex, 1)
      newValues.splice(targetIndex, 0, sourceValue)
      setValues(newValues)
    }
    setDraggedValue(null)
  }

  const handleDrop = (e, targetSection) => {
    e.preventDefault()
    const field = e.dataTransfer.getData('field')
    
    setValues(values.filter(f => f !== field))
    setRows(rows.filter(f => f !== field))
    setColumns(columns.filter(f => f !== field))
    
    switch(targetSection) {
      case 'values':
        if (!values.includes(field)) setValues([...values, field])
        break
      case 'rows':
        if (!rows.includes(field)) setRows([...rows, field])
        break
      case 'columns':
        if (!columns.includes(field)) setColumns([...columns, field])
        break
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const removeField = (field, section) => {
    switch(section) {
      case 'values':
        setValues(values.filter(f => f !== field))
        break
      case 'rows':
        setRows(rows.filter(f => f !== field))
        break
      case 'columns':
        setColumns(columns.filter(f => f !== field))
        break
    }
  }

  const calculateValue = (groupedData, valueField, columnValue) => {
    if (!groupedData) return 0
    
    const relevantData = columnValue 
      ? groupedData.filter(item => columns.every(col => item[col] === columnValue))
      : groupedData

    if (aggregationType === 'sum') {
      return relevantData.reduce((sum, item) => sum + (item[valueField] || 0), 0)
    }
    return relevantData.length
  }

  const getUniqueColumnValues = (colField) => {
    return [...new Set(data.map(item => item[colField]))]
  }

  const groupData = () => {
    return data.reduce((acc, item) => {
      const rowKey = rows.map(field => item[field]).join('-')
      
      if (!acc[rowKey]) {
        acc[rowKey] = []
      }
      acc[rowKey].push(item)
      
      return acc
    }, {})
  }

  const renderTable = () => {
    const groupedData = groupData()
    const uniqueRows = [...new Set(data.map(item => rows.map(field => item[field]).join('-')))]
    const columnValues = columns.length > 0 ? getUniqueColumnValues(columns[0]) : []

    return (
      <div className="overflow-x-auto">
        <div className="mb-4 flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={swapValueColumns}
              onChange={(e) => setSwapValueColumns(e.target.checked)}
              className="rounded border-gray-600 bg-gray-700"
            />
            Swap values and columns in header
          </label>
        </div>
        <table className="min-w-full bg-gray-800 text-white [&>*_th]:border [&>*_td]:border [&>*_td]:p-1">
          <thead>
            <tr>
              {rows.map(field => (
                <th key={field} rowSpan={columns.length > 0 ? 2 : 1}>{field}</th>
              ))}
              {columns.length > 0 && !swapValueColumns && values.map(valueField => (
                <th 
                  key={valueField} 
                  colSpan={columnValues.length}
                  draggable
                  onDragStart={(e) => handleValueDragStart(e, valueField)}
                  onDragOver={(e) => handleValueDragOver(e, valueField)}
                  onDrop={(e) => handleValueDrop(e, valueField)}
                  className="cursor-move hover:bg-gray-700"
                >
                  {valueField}
                </th>
              ))}
              {columns.length > 0 && swapValueColumns && columnValues.map(colValue => (
                <th 
                  key={colValue}
                  colSpan={values.length}
                >
                  {colValue}
                </th>
              ))}
              {columns.length === 0 && values.map(valueField => (
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
                {!swapValueColumns ? (
                  values.map(valueField => 
                    columnValues.map(colValue => (
                      <th key={`${valueField}-${colValue}`}>{colValue}</th>
                    ))
                  )
                ) : (
                  columnValues.map(colValue => 
                    values.map(valueField => (
                      <th 
                        key={`${colValue}-${valueField}`}
                        draggable
                        onDragStart={(e) => handleValueDragStart(e, valueField)}
                        onDragOver={(e) => handleValueDragOver(e, valueField)}
                        onDrop={(e) => handleValueDrop(e, valueField)}
                        className="cursor-move hover:bg-gray-700"
                      >
                        {valueField}
                      </th>
                    ))
                  )
                )}
              </tr>
            )}
          </thead>
          <tbody>
            {uniqueRows.map(row => {
              const rowData = groupedData[row]
              return (
                <tr key={row}>
                  {row.split('-').map((cell, i) => (
                    <td key={i}>{cell}</td>
                  ))}
                  {columns.length > 0 
                    ? (!swapValueColumns 
                        ? values.map(valueField => 
                            columnValues.map(colValue => (
                              <td key={`${valueField}-${colValue}`}>
                                {calculateValue(rowData, valueField, colValue)}
                              </td>
                            ))
                          )
                        : columnValues.map(colValue => 
                            values.map(valueField => (
                              <td key={`${colValue}-${valueField}`}>
                                {calculateValue(rowData, valueField, colValue)}
                              </td>
                            ))
                          )
                      )
                    : values.map(valueField => (
                        <td key={valueField}>
                          {calculateValue(rowData, valueField)}
                        </td>
                      ))
                  }
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div
          className="border border-gray-600 p-4 rounded"
          onDrop={(e) => handleDrop(e, 'values')}
          onDragOver={handleDragOver}
        >
          <h2 className="text-xl mb-2">Values</h2>
          <div className="flex gap-2 mb-2">
            <label>
              <input
                type="radio"
                checked={aggregationType === 'sum'}
                onChange={() => setAggregationType('sum')}
              /> Sum
            </label>
            <label>
              <input
                type="radio"
                checked={aggregationType === 'count'}
                onChange={() => setAggregationType('count')}
              /> Count
            </label>
          </div>
          {values.map(field => (
            <div key={field} className="bg-gray-700 p-2 mb-1 rounded flex justify-between items-center">
              <span>{field}</span>
              <button
                onClick={() => removeField(field, 'values')}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div
          className="border border-gray-600 p-4 rounded"
          onDrop={(e) => handleDrop(e, 'rows')}
          onDragOver={handleDragOver}
        >
          <h2 className="text-xl mb-2">Rows</h2>
          {rows.map(field => (
            <div key={field} className="bg-gray-700 p-2 mb-1 rounded flex justify-between items-center">
              <span>{field}</span>
              <button
                onClick={() => removeField(field, 'rows')}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div
          className="border border-gray-600 p-4 rounded"
          onDrop={(e) => handleDrop(e, 'columns')}
          onDragOver={handleDragOver}
        >
          <h2 className="text-xl mb-2">Columns</h2>
          {columns.map(field => (
            <div key={field} className="bg-gray-700 p-2 mb-1 rounded flex justify-between items-center">
              <span>{field}</span>
              <button
                onClick={() => removeField(field, 'columns')}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="border border-gray-600 p-4 rounded">
          <h2 className="text-xl mb-2">Available Fields</h2>
          {availableFields.map(field => (
            <div
              key={field}
              draggable
              onDragStart={(e) => handleDragStart(e, field)}
              className="bg-gray-700 p-2 mb-1 rounded cursor-move hover:bg-gray-600"
            >
              {field}
            </div>
          ))}
        </div>
      </div>

      {(values.length > 0 && rows.length > 0) && (
        <div className="mt-8">
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Search in table..."
              className="px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white"
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
  )
}

