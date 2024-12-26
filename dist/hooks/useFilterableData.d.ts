export declare function useFilterableData<T extends Record<string, any>>(items: T[], filterKeys: (keyof T)[]): {
    filteredItems: T[];
    setFilter: (key: keyof T | 'global', value: string) => void;
    filterValues: Partial<Record<keyof T | "global", string>>;
};
