import { useState } from 'react';

export function useDraggableColumns<T>(initialColumns: T[]) {
  const [columns, setColumns] = useState<T[]>(initialColumns);

  const handleDragStart = (index: number) => (event: React.DragEvent<HTMLElement>) => {
    event.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
  };

  const handleDrop = (targetIndex: number) => (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    const sourceIndex = parseInt(event.dataTransfer.getData('text/plain'), 10);
    if (sourceIndex !== targetIndex) {
      const newColumns = [...columns];
      const [removed] = newColumns.splice(sourceIndex, 1);
      newColumns.splice(targetIndex, 0, removed);
      setColumns(newColumns);
    }
  };

  return { columns, handleDragStart, handleDragOver, handleDrop };
}

