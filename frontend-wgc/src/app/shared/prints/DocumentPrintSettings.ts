import { DocumentDefinition } from './DocumentDefinition';
import { qrCodesDoc } from './docs/qrCodes';

export type DocumentPrintsType = 'qrcode';

export type DocumentPrintsSettingsType = Record<
  DocumentPrintsType,
  (...args: any[]) => DocumentDefinition
>;

export const DocumentsPrintSettings: DocumentPrintsSettingsType = {
  qrcode: qrCodesDoc,
};
