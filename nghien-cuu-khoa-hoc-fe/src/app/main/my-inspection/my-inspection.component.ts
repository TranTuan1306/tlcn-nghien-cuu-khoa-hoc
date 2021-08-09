import { Component, OnInit } from '@angular/core';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';

@Component({
  selector: 'app-my-inspection',
  templateUrl: './my-inspection.component.html',
  styleUrls: ['./my-inspection.component.scss', '../../../assets/journey-theme/css/main.css']
})
export class MyInspectionComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  regDeTai = true; // test => true
  regIndex = 1; // test thì set, prod phải để tự nhận dạng
  dataDeTai: DeTai;

  ngOnInit(): void {
  }

  getDetaiOfCurrentUser(): void {
    // Get
  }

  dangKyDeTai(): void {
    this.regDeTai = true;
  }

}
