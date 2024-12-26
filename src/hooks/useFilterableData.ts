import { useState, useMemo } from 'react';

export function useFilterableData<T extends Record<string, any>>(items: T[], filterKeys: (keyof T)[]) {
  const [filterValues, setFilterValues] = useState<Partial<Record<keyof T | 'global', string>>>({});

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      (filterValues.global ? Object.values(item).some(val => 
        String(val).toLowerCase().includes(filterValues.global!.toLowerCase())
      ) : true) &&
      filterKeys.every((key) => {
        const filterValue = filterValues[key];
        return !filterValue || String(item[key]).toLowerCase().includes(filterValue.toLowerCase());
      })
    );
  }, [items, filterKeys, filterValues]);

  const setFilter = (key: keyof T | 'global', value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  return { filteredItems, setFilter, filterValues };
}

