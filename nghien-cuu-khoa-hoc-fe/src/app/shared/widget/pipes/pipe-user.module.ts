
import { NgModule } from '@angular/core';
import { CurrencyPipe } from './currency.pipe';

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
  ],
  imports: [
  ],
  exports: [
    CurrencyPipe,
    SafeHtmlPipe,
    ViewCountPipe,
  ],
  providers: []
})
export class PipeUserModule { }
