import { useState, useMemo } from 'react';

export const useFilterableData = <T extends Record<string, any>>(
  items: T[],
  filterKeys: (keyof T)[]
) => {
  const [filterValues, setFilterValues] = useState<Partial<Record<keyof T, string>>>({});

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      filterKeys.every((key) => {
        const filterValue = filterValues[key];
        return (
          !filterValue ||
          String(item[key]).toLowerCase().includes(filterValue.toLowerCase())
        );
      })
    );
  }, [items, filterKeys, filterValues]);

  const setFilter = (key: keyof T, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  return { filteredItems, setFilter, filterValues };
};

