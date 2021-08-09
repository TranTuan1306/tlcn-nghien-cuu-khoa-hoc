import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'currencyVi'
})
export class CurrencyPipe implements PipeTransform {
  transform(value: number,
    decimalLength = 0,
    chunkDelimiter = '.',
    decimalDelimiter = ',',
    chunkLength = 3): string {
    const result = '\\d(?=(\\d{' + chunkLength + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')';
    /* eslint-disable no-bitwise */
    const num = Number(value).toFixed(Math.max(0, ~~decimalLength));
    /* eslint-enable no-bitwise */

    return (decimalDelimiter ? num.replace('.', decimalDelimiter) : num)
      .replace(new RegExp(result, 'g'), '$&' + chunkDelimiter);
  }
}
