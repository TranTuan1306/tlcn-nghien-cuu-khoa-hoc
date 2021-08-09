import { ActivatedRoute } from '@angular/router';
import { HoiDongNghiemThu } from './../../../core/models/management/hoi-dong/hoi-dong-nghiem-thu.model';
import { HoiDongNghiemThuService } from 'src/app/core/services/management/hoi-dong/hoi-dong-nghiem-thu.service';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, OnChanges } from '@angular/core';
import { LanguageConstant } from 'src/app/core/constants/language.constant';

@Component({
  selector: 'app-form-my-inspection',
  templateUrl: './form-my-inspection.component.html',
  styleUrls: ['./form-my-inspection.component.scss'
    , './../../../../assets/theme/css/main.css', './../../../../assets/theme/css/preload.css']
})
export class FormMyInspectionComponent implements OnInit, OnChanges {
  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////
  deTaiData: DeTai;
  hoiDongNghiemThuDaTa: HoiDongNghiemThu;

  constructor(
    private spinner: NgxSpinnerService,
    private hoiDongNghiemThuSvc: HoiDongNghiemThuService,
    private activatedRouterSvc: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.spinner.hide();
    this.getHoiDOngNghiemThuByIdHoiDong();
  }

  ngOnChanges() {
    this.getHoiDOngNghiemThuByIdHoiDong();
  }

  getHoiDOngNghiemThuByIdHoiDong() {
    this.hoiDongNghiemThuSvc.getHoiDongNghiemThuById(this.activatedRouterSvc.snapshot.params.id)
      .subscribe(res => {
        this.hoiDongNghiemThuDaTa = res;
      });
  }

}
