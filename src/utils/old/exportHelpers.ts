import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface Column {
  key: string;
  header: string;
}

export const exportToExcel = <T extends Record<string, any>>(data: T[], columns: Column[], filename: string): void => {
  const worksheet = utils.json_to_sheet(
    data.map(row => 
      columns.reduce((acc, col) => ({ ...acc, [col.header]: row[col.key] }), {})
    )
  );
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  writeFile(workbook, `${filename}.xlsx`);
};

export const exportToPDF = <T extends Record<string, any>>(data: T[], columns: Column[], filename: string): void => {
  const doc = new jsPDF();

  const tableData = data.map(row => columns.map(col => row[col.key]));
  const headers = columns.map(col => col.header);

  (doc as any).autoTable({
    head: [headers],
    body: tableData,
  });

  doc.save(`${filename}.pdf`);
};

