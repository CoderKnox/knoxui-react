import * as React from 'react';
interface DataItem {
    [key: string]: any;
}
interface PivotTableProps {
    initialData: DataItem[];
}
export declare const PivotTable: React.FC<PivotTableProps>;
export default PivotTable;
