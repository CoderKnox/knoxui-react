export declare function useDraggableColumns<T>(initialColumns: T[]): {
    columns: T[];
    handleDragStart: (index: number) => (event: React.DragEvent<HTMLElement>) => void;
    handleDragOver: (event: React.DragEvent<HTMLElement>) => void;
    handleDrop: (targetIndex: number) => (event: React.DragEvent<HTMLElement>) => void;
};
