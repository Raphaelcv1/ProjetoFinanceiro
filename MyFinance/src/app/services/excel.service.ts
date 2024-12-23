import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { formatDate } from '@angular/common';

// import { Lancamentos } from '../model/lancamentos';
// import { LancamentosService } from '../services/lancamentos.service';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  // listaLancamentos = [];

  constructor() { }

  async generateExcel(title, header, data) {

    // Excel Title, Header, Data
    // const title = 'Yearly Social Sharing Education For Betterment';
    // const header = ['Year', 'Month', 'Facebook', 'Reddit', 'LinkedIn', 'Instagram'];

    console.log(data.length);

    // const data = [
    //   [2019, 1, '50', '20', '25', '20'],
    //   [2019, 2, '80', '20', '25', '20'],
    //   [2019, 3, '120', '20', '25', '20'],
    //   [2019, 4, '75', '20', '25', '20'],
    //   [2019, 5, '60', '20', '25', '20'],
    //   [2019, 6, '80', '20', '25', '20'],
    //   [2019, 7, '95', '20', '25', '20'],
    //   [2019, 8, '55', '20', '25', '20'],
    //   [2019, 9, '45', '20', '25', '20'],
    //   [2019, 10, '80', '20', '25', '20'],
    //   [2019, 11, '90', '20', '25', '20'],
    //   [2019, 12, '110', '20', '25', '20'],
    // ];

    // Create workbook and worksheet
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Relatório');


    // Add Row and formatting
    const titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Corbel', family: 4, size: 16, underline: 'double', bold: true };
    worksheet.addRow([]);
    // const subTitleRow = worksheet.addRow(['Date : 06-09-2020']);
    const subTitleRow = worksheet.addRow(['Data: ' + formatDate(new Date().toISOString(), 'dd/MM/yyyy', 'en-US')]);

    worksheet.mergeCells('A1:D2');


    // Blank Row
    worksheet.addRow([]);

    // Add Header Row
    const headerRow = worksheet.addRow(header);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });

    // Add Data and Conditional Formatting
    data.forEach(d => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(5);
      let color = 'FF99FF99';
      // if (+qty.value < 500) {
      if (qty.text != "PAGO") {
        color = 'FF9999';
      } 
      if (qty.text == ""){
        color = 'FFFFFF';
      }

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color }
      };
    }

    );

    worksheet.getColumn(3).width = 30;
    worksheet.getColumn(4).width = 30;
    worksheet.addRow([]);

    // Footer Row
    const footerRow = worksheet.addRow(['Relatótio de Despesas e Recebimentos.']);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCFFE5' }
    };
    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    // Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:E${footerRow.number}`);

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Relatorio.xlsx');
    });

  }

}
