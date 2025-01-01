export const sumBy = <T extends Record<string, any>>(
  data: T[],
  key: keyof T
): number => {
  return data.reduce((sum, item) => sum + (Number(item[key]) || 0), 0);
};

