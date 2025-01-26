export interface DataItem {
  [key: string]: any
}

export interface PivotTableProps {
  initialData: DataItem[]
  title?: string
  className?: string
}

