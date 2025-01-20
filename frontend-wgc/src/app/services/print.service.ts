import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

import {
  DocumentPrintsType,
  DocumentsPrintSettings,
} from '../shared/prints/DocumentPrintSettings';

type WindowFrameExtended = Window & { printPdfFrame: Window };
@Injectable({
  providedIn: 'root',
})
export class PrintService {
  pdfmake: any;

  print(definition: DocumentPrintsType, ...args: any): void {
    const docDefinition = DocumentsPrintSettings[definition](...args);

    this.pdfmake = pdfMake;
    this.pdfmake.vfs = pdfFonts.vfs;

    const frames = window.frames as WindowFrameExtended;

    this.pdfmake.createPdf(docDefinition).print({}, frames.printPdfFrame);
  }
}
