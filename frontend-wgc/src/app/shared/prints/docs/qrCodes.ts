import { Content, Margins, ContentStack } from 'pdfmake/interfaces';
import { DocumentDefinition } from '../DocumentDefinition';
import { GuestsTableData } from '../../../types/admin-panel.types';
import QRCode from 'qrcode-svg';

export function qrCodesDoc(data: GuestsTableData[]): DocumentDefinition {
  const content: Content[] = [];
  const doc: DocumentDefinition = new DocumentDefinition(content);
  doc.setMargins([20, 20, 20, 20]);
  doc.setPageSize('A4');
  doc.pageOrientation = 'landscape';

  doc.setContent(_createContent(data));
  doc.setTitle('Zaproszenia');

  return doc;
}

const _createContent = (data: GuestsTableData[]): ContentStack => {
  const invitationCells = generateInvitationCells(data);
  const tableBody = [];

  for (let i = 0; i < invitationCells.length; i += 4) {
    const row: Content[] = invitationCells.slice(i, i + 4);
    while (row.length < 4) {
      row.push({ text: '' });
    }
    tableBody.push(row);
  }

  return {
    stack: [
      {
        table: {
          widths: Array(4).fill('auto'),
          body: tableBody,
        },
        layout: 'noBorders',
      },
    ],

    margin: [0, 0, 0, 0],
  };
};

const generateInvitationCells = (invitations: GuestsTableData[]): Content[] => {
  const invitationCells: any = invitations.map((invitation, i) => {
    return {
      stack: [
        {
          columns: [
            {
              stack: [
                {
                  svg: new QRCode({
                    content: invitation.qrCodeUrl,
                    width: 69,
                    height: 69,
                    ecl: 'L',
                  }).svg(),
                  width: 69,
                  height: 69,
                },
                {
                  text: invitation.code,
                  margin: [0, 0, 0, 0],
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
          // pageBreak: 'avoid',
        },
      ],
      pageBreak: (i + 1) % 16 === 0 ? 'after' : undefined,
      margin: [10, 10, 10, 10],
    };
  });

  return invitationCells;
};
