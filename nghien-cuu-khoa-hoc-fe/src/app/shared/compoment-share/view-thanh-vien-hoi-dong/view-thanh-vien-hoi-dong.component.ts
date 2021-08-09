import { Component, Input, OnInit } from '@angular/core';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ThanhVienHoiDongNghiemThu } from 'src/app/core/models/management/hoi-dong/hoi-dong-nghiem-thu.model';

@Component({
  selector: 'app-view-thanh-vien-hoi-dong',
  templateUrl: './view-thanh-vien-hoi-dong.component.html',
  styleUrls: ['./view-thanh-vien-hoi-dong.component.scss']
})
export class ViewThanhVienHoiDongComponent implements OnInit {

  @Input() listThanhVienHoiDongView: ThanhVienHoiDongNghiemThu[];
  @Input() truongDonVi: boolean;

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  listChucVuHoiDong = SystemConstant.CHUC_VU_HOI_DONG_TITLE[this.langCode];
  listChucVuHoiDongDeXuat = SystemConstant.CHUC_VU_HOI_DONG_DE_XUAT_TITLE[this.langCode];

  ngOnInit(): void {
    this.listChucVuHoiDong = this.listChucVuHoiDong.concat(this.listChucVuHoiDongDeXuat);
  }

  getNameOfChucVu(id: string): string {
    const chucVu = this.listChucVuHoiDong.find(x => x.id === id);
    return chucVu ? chucVu.title : '';
  }

}
