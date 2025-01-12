import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DocumentDefinition } from '../shared/prints/DocumentDefinition';
import { DocumentsPrintSettings } from '../shared/prints/DocumentPrintSettings';

type WindowFrameExtended = Window & { printPdfFrame: Window };
@Injectable({
  providedIn: 'root',
})
export class PrintService {
  print(): void {
    const docDefinition = DocumentsPrintSettings.qrcode();
    const frames = window.frames as WindowFrameExtended;

    pdfMake.createPdf(docDefinition).print({}, frames.printPdfFrame);
  }
}
