import 'jspdf-autotable';
interface Column {
    key: string;
    header: string;
}
export declare const exportToExcel: <T extends Record<string, any>>(data: T[], columns: Column[], filename: string) => void;
export declare const exportToPDF: <T extends Record<string, any>>(data: T[], columns: Column[], filename: string) => void;
export {};
