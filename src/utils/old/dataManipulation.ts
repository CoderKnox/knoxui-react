export const groupBy = <T extends Record<string, any>>(
    array: T[],
    key: keyof T
  ): Record<string, T[]> => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {} as Record<string, T[]>);
  };
  
  export const sumBy = <T extends Record<string, any>>(
    array: T[],
    key: keyof T
  ): number => {
    return array.reduce((sum, current) => sum + (current[key] as number), 0);
  };
  
  export const uniqueBy = <T extends Record<string, any>>(
    array: T[],
    key: keyof T
  ): T[] => {
    return Array.from(new Map(array.map(item => [item[key], item])).values());
  };
  
  