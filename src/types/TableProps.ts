export interface Column {
  key: string;
  header: string;
  dataType?: 'string' | 'int' | 'float' | 'date' | 'datetime' | 'currency';
  formatDate?: string;
  currentFormat?: string;
  sum?: boolean;
}

export interface TableConfig {
  data: Record<string, any>[];
  columns: Column[];
}

export type TableSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

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

