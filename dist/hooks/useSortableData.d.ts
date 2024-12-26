type SortConfig<T> = {
    key: keyof T;
    direction: 'asc' | 'desc';
} | null;
export declare function useSortableData<T>(items: T[], config?: SortConfig<T>): {
    items: T[];
    requestSort: (key: keyof T) => void;
    sortConfig: SortConfig<T>;
};
export {};
