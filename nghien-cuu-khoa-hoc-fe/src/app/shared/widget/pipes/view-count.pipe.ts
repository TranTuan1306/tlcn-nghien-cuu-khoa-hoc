import { Pipe, PipeTransform } from '@angular/core';
import { LanguageConstant } from 'src/app/core/constants/language.constant';

@Pipe({
  name: 'viewCount'
})
export class ViewCountPipe implements PipeTransform {

  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';

  million = this.langCode === 'vi' ? 'Tr' : 'M';
  billion = this.langCode === 'vi' ? 'T' : 'B';

  transform(value: number): string {
    if (value < 1000) {
      return value + '';
    } else if (value >= 1000 && value < 1000000) {
      return parseFloat((value / 1000).toString()).toFixed(1) + 'K';
    } else if (value >= 1000000 && value < 1000000000) {
      return parseFloat((value / 1000000).toString()).toFixed(1) + this.million;
    } else {
      return parseFloat((value / 1000000000).toString()).toFixed(1) + this.billion;
    }
  }
}
