import {
  Alignment,
  Content,
  DynamicContent,
  Margins,
  PageSize,
  Style,
  StyleDictionary,
  TDocumentDefinitions,
  ContentColumns,
  PageOrientation,
} from 'pdfmake/interfaces';

export const SECTION_HEADER_FONT_SIZE = 12;
export const SECTION_HEADER_LINE_HEIGHT = 1;
export const SECTION_LABEL_FONT_SIZE = 6;
export const SECTION_LABEL_LINE_HEIGHT = 1;
export const SECTION_TEXT_FONT_SIZE = 8;
export const SECTION_TEXT_LINE_HEIGHT = 1.2;
export const LINE_BREAK = 1.3;
export const AVERAGE_CHARS = 25;

export class DocumentDefinition implements TDocumentDefinitions {
  header: DynamicContent | Content | undefined;
  footer: DynamicContent | Content | undefined;
  content: Content[];
  pageMargins: Margins | undefined;
  pageSize: PageSize | undefined;
  styles: StyleDictionary | undefined;
  defaultStyle: Style | undefined;
  pageOrientation?: PageOrientation;

  constructor(content?: Content[]) {
    this.content = content ? content : [];

    this.pageMargins = [40, 40, 40, 40];

    this.defaultStyle = {
      fontSize: 8,
      font: 'Roboto',
    };

    this._setCustomStyles();
  }

  static createDottedField(
    name: string,
    text = ' ',
    dots = 60,
    align: Alignment = 'left'
  ): Content[] {
    let dotsLine = '';
    for (let i = 0; i < dots; i++) {
      dotsLine += '.';
    }

    const result: Content[] = [
      { text: text + ' ', margin: [0, 0, 0, -9], alignment: align },
      { text: dotsLine, alignment: align },
      { text: name, fontSize: 8, alignment: align },
    ];
    return result;
  }

  setPageSize(pageSize: PageSize): void {
    this.pageSize = pageSize;
  }

  setContent(content: any): void {
    this.content = content;
  }

  setMargins(margins: any): void {
    this.pageMargins = margins;
  }

  setHeader(header: DynamicContent | Content | undefined): void {
    this.header = header;
  }

  setFooter(footer: DynamicContent | Content | undefined): void {
    this.footer = footer;
  }

  setStyles(styles: any): void {
    this.styles = styles;
  }

  appendStyles(styles: any): void {
    this.styles = { ...this.styles, ...styles };
  }

  private _setCustomStyles(): void {
    this.styles = {};
  }
}
