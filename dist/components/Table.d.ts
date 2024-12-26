import * as React from 'react';
import "jspdf-autotable";
interface SizeClasses {
    [key: string]: string;
}
interface Column {
    key: string;
    header: string;
    dataType?: string;
    sum?: boolean;
}
interface TableConfig {
    data: any[];
    columns: Column[];
}
interface TableProps {
    tableConfig: TableConfig;
    isSerialized?: boolean;
    size?: keyof SizeClasses;
    header?: boolean;
    title?: string;
    printSize?: string;
    sum?: boolean;
}
declare const Table: React.FC<TableProps>;
export default Table;
