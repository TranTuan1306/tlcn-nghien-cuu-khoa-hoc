import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  convertTimeZone(isoTime: string): string {
    return moment.tz(isoTime, 'YYYY-MM-DDTHH:mm:ss', 'Asia/Ho_Chi_Minh').format();
  }

  readNumberAsText(num: number, endingStr: string) {
    const tienText = ['', ' nghìn ', ' triệu ', ' tỷ ', ' nghìn tỷ ', ' triệu tỷ ', ' tỷ tỷ '];
    const strNum = num.toString().split(/(?=(?:...)*$)/);
    const len = strNum.length;
    let output = ' ' + endingStr;

    if (isNaN(num)) {
      return '';
    } else if (num === 0) {
      return 'Không ' + endingStr;
    } else {
      for (let i = 0; i < len; i++) {
        if (parseInt(strNum[len - 1 - i], 10) === 0) {
          continue;
        }
        output = tienText[i] + output;
        output = this.readNumber3Num(strNum[len - 1 - i]) + output;
      }
      return output.replace('  ', ' ').charAt(0).toUpperCase() + output.replace('  ', ' ').slice(1);
    }
  }

  private readNumber3Num(num: string) {
    let output = '';
    if (num.length === 1) {
      output = this.getTextOfDonVi(parseInt(num, 10), '0');
    } else if (num.length === 2) {
      output = this.getTextOfChuc(parseInt(num[0], 10), num[1]) + ' '
        + this.getTextOfDonVi(parseInt(num[1], 10), num[0]);
    } else if (num.length === 3) {
      output = this.getTextOfTram(parseInt(num[0], 10)) + ' ' +
        this.getTextOfChuc(parseInt(num[1], 10), num[2]) + ' ' +
        this.getTextOfDonVi(parseInt(num[2], 10), num[1]);
    } else {
      output = '';
    }
    return output;
  }

  private getTextOfDonVi(num: number, hangChuc: string) {
    switch (num) {
      case 0:
        // return hangChuc === '0' ? '' : 'khôngB';
        return '';
      case 1:
        return hangChuc === '0' || hangChuc === '1' ? 'một' : 'mốt';
      case 2:
        return 'hai';
      case 3:
        return 'ba';
      case 4:
        return 'bốn';
      case 5:
        return hangChuc === '0' ? 'năm' : 'lăm';
      case 6:
        return 'sáu';
      case 7:
        return 'bảy';
      case 8:
        return 'tám';
      case 9:
        return 'chín';
      default:
        break;
    }
  }

  private getTextOfChuc(num: number, hangDonVi: string) {
    switch (num) {
      case 0:
        return hangDonVi === '0' ? '' : 'lẻ';
      case 1:
        return 'mười';
      case 2:
        return 'hai mươi';
      case 3:
        return 'ba mươi';
      case 4:
        return 'bốn mươi';
      case 5:
        return 'năm mươi';
      case 6:
        return 'sáu mươi';
      case 7:
        return 'bảy mươi';
      case 8:
        return 'tám mươi';
      case 9:
        return 'chín mươi';
      default:
        break;
    }
  }

  private getTextOfTram(num: number) {
    switch (num) {
      case 0:
        return 'không trăm';
      case 1:
        return 'một trăm';
      case 2:
        return 'hai trăm';
      case 3:
        return 'ba trăm';
      case 4:
        return 'bốn trăm';
      case 5:
        return 'năm trăm';
      case 6:
        return 'sáu trăm';
      case 7:
        return 'bảy trăm';
      case 8:
        return 'tám trăm';
      case 9:
        return 'chín trăm';
      default:
        break;
    }
  }

}
