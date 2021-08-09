import { BienBanHoiDongThuyetMinhService } from './../../../../core/services/management/hoi-dong/bien-ban-hoi-dong-thuyet-minh.service';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { DeTai } from './../../../../core/models/management/de-tai/de-tai.model';
import { Paginate } from './../../../../shared/widget/paginate/paginate.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
// import { LinhVucNghienCuuService } from 'src/app/core/services/management/danh-muc/linh-vuc-nghien-cuu.service';
// import { DeTaiAdminService } from 'src/app/core/services/management/de-tai/de-tai-admin.service';
// import { HoiDongKiemDuyetService } from 'src/app/core/services/management/hoi-dong/hoi-dong-kiem-duyet.service';
// import { NhanVienService } from 'src/app/core/services/user/nhan-vien.service';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { DeTaiAdminService } from 'src/app/core/services/management/de-tai/de-tai-admin.service';
import { ToastrService } from 'ngx-toastr';
import { ValidatorService } from 'src/app/core/services/common/validator.service';

@Component({
  selector: 'app-form-bien-ban-hoi-dong-xet-duyet',
  templateUrl: './form-bien-ban-hoi-dong-xet-duyet.component.html',
  styleUrls: ['./form-bien-ban-hoi-dong-xet-duyet.component.scss']
})
export class FormBienBanHoiDongXetDuyetComponent implements OnInit {

  @Input() idHoiDong: string;
  @Input() modalData: ModalData<string[]>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  form: FormGroup;

  listDeTai: Paginate<DeTai> = new Paginate<DeTai>();
  deTaiShow: DeTai;
  messageConstant = MessageConstant;

  constructor(
    private fb: FormBuilder,
    // private validatorSvc: ValidatorService,
    private alert: ToastrService,
    private deTaiSvc: DeTaiAdminService,
    private bienBanHoiThuyetMinhDuyetSvc: BienBanHoiDongThuyetMinhService,
    private validatorSvc: ValidatorService,
    // private nhanVienSvc: NhanVienService,
    // private hoiDongKiemDuyetSvc: HoiDongKiemDuyetService,
    // private linhVucSvc: LinhVucNghienCuuService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getDeTaiByListDeTaiId();
  }

  getDeTaiByListDeTaiId(searchValue?: string) {
    this.deTaiSvc.getDeTaiByListIdPaging(
      this.modalData.data,
      this.listDeTai.currentPage - 1,
      this.listDeTai.limit,
      searchValue)
      .subscribe(res => {
        this.listDeTai.data = res.content;
      });
  }

  handleChangeDeTai(id: string) {
    const index = this.listDeTai.data.findIndex(x => x.id === id);
    this.deTaiShow = this.listDeTai.data[index];
  }

  createForm() {
    this.form = this.fb.group({
      deTaiId: ['', [Validators.required]]
    });
  }

  isFieldValid(field: string) {
    return (
      !this.form.get(field).valid && this.form.get(field).touched
    );
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  onSubmit() {
    if (this.form.valid) {
      this.bienBanHoiThuyetMinhDuyetSvc.createBienBanHoiDongKiemDuyet(this.idHoiDong, this.form.get('deTaiId').value)
        .subscribe(() => {
          this.alert.success(MessageConstant[this.langCode].MSG_CREATED_DONE);
          this.returnData.emit(true);
        });
    } else {
      this.alert.warning(MessageConstant[this.langCode].MSG_FIELD_EMPTY);
      this.validatorSvc.validateAllFormFields(this.form);
    }
  }

  onCancel() {
    this.returnData.emit(false);
  }

}
