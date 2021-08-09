
import { NgModule } from '@angular/core';
import { CurrencyPipe } from './currency.pipe';
import { HtmlToPlaintextPipe } from './html-to-text.pipe';

// third library

// #1 https://github.com/danrevah/ngx-pipes#installation
import { SafeHtmlPipe } from './safe-html.pipe';
import { ViewCountPipe } from './view-count.pipe';

@NgModule({
  declarations: [
    CurrencyPipe,
    SafeHtmlPipe,
    SafeHtmlPipe,
    ViewCountPipe,
    HtmlToPlaintextPipe
  ],
  imports: [
  ],
  exports: [
    CurrencyPipe,
    SafeHtmlPipe,
    ViewCountPipe,
    HtmlToPlaintextPipe
  ],
  providers: []
})
export class PipeUserModule { }
