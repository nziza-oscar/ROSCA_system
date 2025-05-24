import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
// import {SaveAs}np
import * as XLSX from 'exceljs';
import { File } from 'lucide-react';


const ExportExcel = ({fileName,data}) => {
    const exportToExcel = async () => {
        // Create a new workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Categories');
        const productSheet = workbook.addWorksheet('Products');
    
        // Extract columns from the first row of data 
        if (data.length > 0) {
          // Dynamically define columns based on the keys in the first data object
          const columns = Object.keys(data[0]).map(key => ({
            header: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize header
            key: key,
            width: 20 // Adjust width as needed
          }));
          worksheet.columns = columns;
          productSheet.columns = columns;
    
          // Add data rows
          data.forEach(row => {
            worksheet.addRow(row)
            productSheet.addRow(row)
          });
        }
    
        // Generate Excel file as a buffer
        const buffer = await workbook.xlsx.writeBuffer();
    
        // Create a Blob from the buffer and save the file
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, fileName || 'download.xlsx');
      }; 

    return (
      <div>
        
          <button className='bg-green-500 px-2 py-2 rounded text-sm text-white flex gap-2' 
          onClick={exportToExcel}>
            <File size={16}/>
            <span>Excel</span>
          </button>

      </div>
    )
  }
  export default ExportExcel