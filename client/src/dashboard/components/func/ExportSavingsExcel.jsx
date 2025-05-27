import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import { File } from 'lucide-react';

const ExportSavingsExcel = ({ fileName, data }) => {
  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Savings');

    worksheet.columns = [
      { header: 'Image', key: 'image', width: 15 },
      { header: 'Name', key: 'name', width: 25 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'Amount', key: 'amount', width: 10 },
      { header: 'Currency', key: 'currency', width: 10 },
      { header: 'Status', key: 'status', width: 12 },
      { header: 'Date', key: 'depositedAt', width: 20 },
    ];

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, size: 14, color: { argb: 'FFFFFFFF' } };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4CAF50' },
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    let totalAmount = 0;

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      totalAmount += item.amount;

      const row = worksheet.addRow({
        name: item.depositedBy.name,
        phone: item.depositedBy.phone,
        amount: item.amount,
        currency: item.currency,
        status: item.status,
        depositedAt: item.depositedAt.split("T")[0],
      });

      if (item.proof?.url) {
        try {
          const res = await fetch(item.proof.url);
          const blob = await res.blob();
          const buffer = await blob.arrayBuffer();

          const imageId = workbook.addImage({
            buffer: Buffer.from(buffer),
            extension: item.proof.url.includes('.png') ? 'png' : 'jpeg',
          });

          worksheet.addImage(imageId, {
            tl: { col: 0, row: row.number - 1 },
            ext: { width: 50, height: 50 },
            editAs: 'oneCell',
          });

          worksheet.getRow(row.number).height = 40;
        } catch (err) {
          console.error(`Failed to fetch image for row ${i + 1}`, err);
        }
      }
    }

    // Add total row
    const totalRow = worksheet.addRow({
      name: 'Total',
      amount: totalAmount,
    });

    totalRow.font = { bold: true };
    totalRow.eachCell((cell, colNumber) => {
      if (colNumber === 2 || colNumber === 4) {
        cell.font = { bold: true };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFE0E0E0' },
        };
      }
    });

    const buf = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buf], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, fileName || 'savings.xlsx');
  };

  return (
    <div>
      <button
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2"
        onClick={exportToExcel}
      >
        <File size={16} />
        <span>Export Excel</span>
      </button>
    </div>
  );
};

export default ExportSavingsExcel;
