import { Content, Margins, ContentStack } from 'pdfmake/interfaces';
import { DocumentDefinition } from '../DocumentDefinition';
import { GuestsTableData } from '../../../types/admin-panel.types';

export function qrCodesDoc(data: any): DocumentDefinition {
  const content: Content[] = [];

  const doc: DocumentDefinition = new DocumentDefinition(content);
  doc.setMargins([20, 20, 20, 20]);
  doc.setPageSize('A4');
  doc.pageOrientation = 'landscape';
  doc.setContent(_createContent(data));

  return doc;
}

const _createContent = (data: GuestsTableData[]): ContentStack => {
  return {
    stack: [],

    margin: [0, 0, 0, 0],
  };
};
