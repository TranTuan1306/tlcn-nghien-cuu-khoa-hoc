import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ChiTietKhoanChi, ChiTietKinhPhiDuKien, LoaiKinhPhi } from 'src/app/core/models/management/danh-muc/kinh-phi.model';

@Component({
  selector: 'app-form02bs-phu-luc-kinh-phi',
  templateUrl: './form02bs-phu-luc-kinh-phi.component.html',
  styleUrls: ['./form02bs-phu-luc-kinh-phi.component.scss']
})
export class Form02bsPhuLucKinhPhiComponent implements OnInit {

  @Input() modalData: ModalData<ChiTietKinhPhiDuKien>;
  @Output() returnData: EventEmitter<ChiTietKinhPhiDuKien> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  loaiKinhPhi: LoaiKinhPhi;
  listChiTietKhoanChi: ChiTietKhoanChi[] = [];
  editCache: { [key: string]: {
    edit: boolean;
    data: ChiTietKhoanChi; };
  } = {};
  editingId = '';
  editRowTableScrool = { x: '0px' };

  constructor(
    private alert: ToastrService,
  ) { }

  ngOnInit(): void {
    this.loaiKinhPhi = this.modalData.data.loaiKinhPhi;
    this.listChiTietKhoanChi = [...this.modalData.data.chiTietKhoanChis];
    this.editRowTableScrool = { x: (800 + this.loaiKinhPhi.fieldNames.length * 150) + 'px' };
  }

  addBlankCell(): void {
    if (this.listChiTietKhoanChi.findIndex(x => !x.noiDungChi) >= 0) {
      this.alert.warning(this.languageData[this.langCode].A_PAYMENT_NOT_DONE_YET);
    } else {
      const newId = Math.floor(Math.random() * 1000000000).toString();
      this.listChiTietKhoanChi.push(new ChiTietKhoanChi(newId));
      this.updateEditCache();
      this.listChiTietKhoanChi = [...this.listChiTietKhoanChi];
      this.startEdit(newId);
    }
  }

  startEdit(id: string): void {
    this.updateEditCache();
    this.editingId = id;
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listChiTietKhoanChi.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listChiTietKhoanChi[index] },
      edit: false
    };
    this.editingId = '';
  }

  saveEdit(id: string): void {
    if (!this.editCache[id].data.noiDungChi) {
      this.alert.error(this.languageData[this.langCode].PLEASE_FINISH_PAYMENT);
    } else {
      const index = this.listChiTietKhoanChi.findIndex(item => item.id === id);
      Object.assign(this.listChiTietKhoanChi[index], this.editCache[id].data);
      this.editCache[id].edit = false;
      this.editingId = '';
      this.updateEditCache();
    }
  }

  deleteCell(id: string): void {
    this.listChiTietKhoanChi.splice(this.listChiTietKhoanChi.findIndex(x => x.id === id), 1);
    this.updateEditCache();
    this.listChiTietKhoanChi = [...this.listChiTietKhoanChi];
    this.editingId = '';
  }

  updateEditCache(): void {
    this.editCache = {};
    this.listChiTietKhoanChi.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  onCancel() {
    this.returnData.emit(null);
  }

  onSubmit() {
    if (this.editingId) {
      this.alert.error(this.languageData[this.langCode].PLEASE_FINISH_PAYMENT);
    } else {
      const indexEmpty = this.listChiTietKhoanChi.findIndex(x => !x.noiDungChi);
      if (indexEmpty >= 0) {
        this.listChiTietKhoanChi.splice(indexEmpty, 1);
      }
      setTimeout(() => {
        const tmpChiTietKinhPhi = { ...this.modalData.data };
        tmpChiTietKinhPhi.chiTietKhoanChis = this.listChiTietKhoanChi;
        this.returnData.emit(tmpChiTietKinhPhi);
      }, 100);
    }
  }

}
