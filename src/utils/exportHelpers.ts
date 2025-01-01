import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Column } from '../types/TableProps';

export const exportToExcel = <T extends Record<string, any>>(
  data: T[],
  columns: Column[],
  fileName: string
) => {
  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  writeFile(workbook, `${fileName}.xlsx`);
};

export const exportToPDF = <T extends Record<string, any>>(
  data: T[],
  columns: Column[],
  fileName: string
) => {
  const doc = new jsPDF();
  (doc as any).autoTable({
    head: [columns.map((col) => col.header)],
    body: data.map((row) => columns.map((col) => row[col.key])),
  });
  doc.save(`${fileName}.pdf`);
};

