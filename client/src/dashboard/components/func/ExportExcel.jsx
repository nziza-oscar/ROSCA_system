import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import { File } from 'lucide-react';

const ExportExcel = ({ fileName, data }) => {
  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Categories');
    const productSheet = workbook.addWorksheet('Products');

    if (data.length > 0) {
      const columns = Object.keys(data[0]).map(key => ({
        header: key.charAt(0).toUpperCase() + key.slice(1),
        key: key,
        width: 20
      }));

      worksheet.columns = columns;
      productSheet.columns = columns;

      // Add header styling
      [worksheet, productSheet].forEach(sheet => {
        sheet.getRow(1).eachCell(cell => {
          cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF228B22' } // ForestGreen
          };
        });
      });

      // Add data rows with alternating row colors
      data.forEach((rowData, index) => {
        const row1 = worksheet.addRow(rowData);
        const row2 = productSheet.addRow(rowData);

        const fillColor = index % 2 === 0 ? 'FFF0FFF0' : 'FFFFFFFF'; // Light green & white

        [row1, row2].forEach(row => {
          row.eachCell(cell => {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: fillColor }
            };
          });
        });
      });
    }

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    saveAs(blob, fileName || 'download.xlsx');
  };

  return (
    <div>
      <button
        className="bg-green-500 px-3 py-2 rounded text-sm text-white flex items-center gap-2 hover:bg-green-600 transition"
        onClick={exportToExcel}
      >
        <File size={16} />
        <span>Export to Excel</span>
      </button>
    </div>
  );
};

export default ExportExcel;
