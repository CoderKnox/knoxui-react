import { useState } from 'react';
import { Column } from '../types/TableProps';

export const useDraggableColumns = (initialColumns: Column[]) => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  const handleDragStart = (index: number) => (e: React.DragEvent<HTMLTableHeaderCellElement>) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableHeaderCellElement>) => {
    e.preventDefault();
  };

  const handleDrop = (targetIndex: number) => (e: React.DragEvent<HTMLTableHeaderCellElement>) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (sourceIndex !== targetIndex) {
      const newColumns = [...columns];
      const [removed] = newColumns.splice(sourceIndex, 1);
      newColumns.splice(targetIndex, 0, removed);
      setColumns(newColumns);
    }
  };

  return { columns, handleDragStart, handleDragOver, handleDrop };
};

