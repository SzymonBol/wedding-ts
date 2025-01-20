import { Content, Margins, ContentStack } from 'pdfmake/interfaces';
import { DocumentDefinition } from '../DocumentDefinition';
import { GuestsTableData } from '../../../types/admin-panel.types';

export function qrCodesDoc(
  data: GuestsTableData[],
  qrCodeSize: number,
  numberOfColumns: number,
  margin: number
): DocumentDefinition {
  const content: Content[] = [];
  const doc: DocumentDefinition = new DocumentDefinition(content);
  doc.setMargins([20, 20, 20, 20]);
  doc.setPageSize('A4');
  doc.pageOrientation = 'landscape';
  doc.setContent(_createContent(data, qrCodeSize, numberOfColumns, margin));
  doc.setTitle('Zaproszenia');

  return doc;
}

const _createContent = (
  data: GuestsTableData[],
  qrCodeSize: number,
  columnsPerRow: number,
  margin: number
): ContentStack => {
  const invitationCells = generateInvitationCells(data, qrCodeSize, margin);
  const tableBody = [];

  for (let i = 0; i < invitationCells.length; i += columnsPerRow) {
    const row: Content[] = invitationCells.slice(i, i + columnsPerRow);
    while (row.length < columnsPerRow) {
      row.push({ text: '' });
    }
    tableBody.push(row);
  }

  return {
    stack: [
      {
        table: {
          widths: Array(columnsPerRow).fill('auto'),
          body: tableBody,
        },
        layout: 'noBorders',
      },
    ],

    margin: [0, 0, 0, 0],
  };
};

const generateInvitationCells = (
  invitations: GuestsTableData[],
  qrCodeSize: number,
  margin: number
): Content[] => {
  const invitationCells: any = invitations.map((invitation) => {
    return {
      stack: [
        {
          columns: [
            {
              stack: [
                { qr: invitation.qrCodeUrl, fit: qrCodeSize }, // QR code with specified size
                {
                  text: invitation.code,
                  margin: [0, margin, 0, 0],
                  alignment: 'center',
                },
              ],
              width: 'auto',
            },
            {
              stack: [
                invitation.guests.map((guest) => ({
                  text: `${guest.name} ${guest.surname}`,
                })),
              ],
              width: '*',
              margin: [10, 0, 0, 0],
            },
          ],
          margin: [0, 10, 0, 10],
          pageBreak: 'avoid',
        },
      ],
      margin: [10, 10, 10, 10],
      pageBreak: 'avoid',
    };
  });

  return invitationCells;
};
