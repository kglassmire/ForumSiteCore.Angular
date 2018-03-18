import { Injectable } from '@angular/core';
import * as showdown from 'showdown';
const converter = new showdown.Converter();

@Injectable()
export class MarkdownService {

  public markdownHtml(markdown: string) {
    return converter.makeHtml(markdown);
  }

  constructor() {
    converter.setFlavor('github');
  }

}
