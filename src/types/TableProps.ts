export interface Column {
  key: string;
  header: string;
  dataType?: 'string' | 'int' | 'float' | 'date' | 'datetime' | 'currency';
  sum?: boolean;
}

export interface TableConfig {
  data: Record<string, any>[];
  columns: Column[];
}

export type TableSize = 'xs' | 's' | 'm' | 'l' | 'xl';

export interface TableProps {
  tableConfig  : TableConfig;
  isSerialized ?: boolean;
  size ?: TableSize;
  header ?: boolean;
  title ?: string;
  printSize ?: string;
  sum ?: boolean;
}

export interface SortConfig {
  key : string | null;
  direction : 'asc' | 'desc' | null;
}

