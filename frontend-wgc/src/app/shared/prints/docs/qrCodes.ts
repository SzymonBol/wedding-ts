import { Content, Margins, ContentStack } from 'pdfmake/interfaces';
import { DocumentDefinition } from '../DocumentDefinition';
import { GuestsTableData } from '../../../types/admin-panel.types';

export function qrCodesDoc(data: GuestsTableData[]): DocumentDefinition {
  const content: Content[] = [];
  console.log(data);
  const doc: DocumentDefinition = new DocumentDefinition(content);
  doc.setMargins([20, 20, 20, 20]);
  doc.setPageSize('A4');
  doc.pageOrientation = 'landscape';
  doc.setContent(_createContent(data));

  return doc;
}

const _createContent = (data: GuestsTableData[]): ContentStack => {
  return {
    stack: [data.map((el) => _createCell(el))],

    margin: [0, 0, 0, 0],
  };
};

const _createCell = (data: GuestsTableData): Content => {
  const qrSize = 90; // Dowolna liczba, sensowne rozmiary w przedziale 70-120

  // const noColumns = 3;
  // const columns = Array.from({ length: noColumns }, () => []);
  // for (let i = 0; i < noColumns; i++) {}

  const content: Content = [
    {
      // columns: [
      //   {
      //     stack: [
      //       { qr: data.qrCodeUrl, fit: qrSize, alignment: 'center' },
      //       { text: data.code, alignment: 'center' },
      //     ],
      //   },
      //   {
      //     stack: [
      //       data.guests.map((guest) => ({
      //         text: `${guest.name} ${guest.surname}`,
      //       })),
      //     ],
      //   },
      // ],
      layout: 'noBorders',
      table: {
        widths: ['auto', 'auto'],
        body: [
          [
            {
              qr: data.qrCodeUrl,
              fit: qrSize,
            },
            {
              stack: [
                data.guests.map((guest) => ({
                  text: `${guest.name} ${guest.surname}`,
                })),
              ],
              alignment: 'justify',
            },
          ],
          [{ text: data.code, alignment: 'center' }, { text: '' }],
        ],
      },
    },
  ];

  return content;
};
