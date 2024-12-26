export declare const groupBy: <T extends Record<string, any>>(array: T[], key: keyof T) => Record<string, T[]>;
export declare const sumBy: <T extends Record<string, any>>(array: T[], key: keyof T) => number;
export declare const uniqueBy: <T extends Record<string, any>>(array: T[], key: keyof T) => T[];
