import { Component, OnInit } from '@angular/core';
import { LanguageConstant } from 'src/app/core/constants/language.constant';

@Component({
  selector: 'app-list-file-hoi-dong-nghiem-thu',
  templateUrl: './list-file-hoi-dong-nghiem-thu.component.html',
  styleUrls: ['./list-file-hoi-dong-nghiem-thu.component.scss']
})
export class ListFileHoiDongNghiemThuComponent implements OnInit {
  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  ngOnInit(): void {
  }

}
