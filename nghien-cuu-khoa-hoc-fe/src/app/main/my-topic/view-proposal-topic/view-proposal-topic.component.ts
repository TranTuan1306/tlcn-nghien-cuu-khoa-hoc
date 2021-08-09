import Editor from 'src/assets/libs/ckeditor5/build/ckeditor';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { LinhVucNghienCuu } from 'src/app/core/models/management/danh-muc/linh-vuc-nghien-cuu.model';
import { SanPhamDuKien } from 'src/app/core/models/management/danh-muc/san-pham.model';
import { DeTaiDto } from 'src/app/core/models/management/de-tai/de-tai-dto.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { LinhVucNghienCuuService } from 'src/app/core/services/management/danh-muc/linh-vuc-nghien-cuu.service';
import { DeTaiService } from 'src/app/core/services/user/de-tai.service';


@Component({
  selector: 'app-view-proposal-topic',
  templateUrl: './view-proposal-topic.component.html',
  styleUrls: ['./view-proposal-topic.component.scss']
})
export class ViewProposalTopicComponent implements OnInit {


  @Input() modalData: ModalData<DeTai>;
  @Input() dotDangKyId: string;
  @Input() deTaiId: string;
  @Output() modalReturn: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  editor = Editor;
  cfgEditor = SystemConstant.configEditor5;

  form: FormGroup;
  listSanPhamDuKien: SanPhamDuKien;

  noiDungDeTai: DeTai = null;
  detaiDto: DeTaiDto = new DeTaiDto();

  listLinhVuc: LinhVucNghienCuu[] = [];

  isShowForm = false;

  constructor(
    private fbd: FormBuilder,
    private validatorSvc: ValidatorService,
    private deTaiSvc: DeTaiService,
    private alert: ToastrService,
    private linhVucNghienCuuSvc: LinhVucNghienCuuService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    // console.log('iddd', this.activatedRouterSvc.snapshot.params.id);
  }

  ngOnInit() {
    this.createForm();
  }

  getApiDeTaiById() {
    this.deTaiSvc.getDeTaiById(this.deTaiId)
      .subscribe(res => {
        this.patchValueForm(res);
        this.noiDungDeTai = res;
      });
  }

  createForm() {
    setTimeout(() => {
      this.form = this.fbd.group({
        tenDeTai: ['', Validators.required],
        tenDeTaiEn: ['', Validators.required],
        linhVucNghienCuu: ['', Validators.required],
        tinhCapThiet: [{ value: '', disabled: true }, Validators.required],
        mucTieu: [{ value: '', disabled: true }, Validators.required],
        mucTieuEn: [{ value: '', disabled: true }, Validators.required],
        noiDungChinh: [{ value: '', disabled: true }, Validators.required],
        sanPhamKhoaHoc: [{ value: '', disabled: true }, Validators.required],
        sanPhamDaoTao: [{ value: '', disabled: true }, Validators.required],
        sanPhamUngDung: [{ value: '', disabled: true }, Validators.required],
        sanPhamKhac: [{ value: '', disabled: true }, Validators.required],
        hieuQuaDuKien: [{ value: '', disabled: true }, Validators.required],
        nhuCauKinhPhiDuKien: ['', Validators.required],
        thoiGianNghienCuuDuKien: ['', Validators.required],
      });
      this.getAllLinhVuc();
      this.getApiDeTaiById();
      this.isShowForm = true;
    }, 200);
  }

  patchValueForm(res: DeTai) {
    this.form.patchValue({
      tenDeTai: res?.tenDeTai,
      tenDeTaiEn: res?.tenDeTaiEn,
      linhVucNghienCuu: res.linhVucNghienCuu?.id,
      tinhCapThiet: res?.tinhCapThiet,
      mucTieu: res?.mucTieu,
      mucTieuEn: res?.mucTieuEn,
      noiDungChinh: res?.noiDungChinh,
      sanPhamKhoaHoc: res.sanPhamDuKien?.sanPhamKhoaHoc,
      sanPhamDaoTao: res.sanPhamDuKien?.sanPhamDaoTao,
      sanPhamUngDung: res.sanPhamDuKien?.sanPhamUngDung,
      sanPhamKhac: res.sanPhamDuKien?.sanPhamKhac,
      hieuQuaDuKien: res?.hieuQuaDuKien,
      nhuCauKinhPhiDuKien: res?.nhuCauKinhPhiDuKien.toString().replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
      thoiGianNghienCuuDuKien: res?.thoiGianNghienCuuDuKien,
    });
    this.spinner.hide();
  }

  onCancel() {
    this.modalReturn.emit();
  }

  setVauleToDeTaiDtoFromForm() {
    this.detaiDto.tenDeTai = this.form.get('tenDeTai').value;
    this.detaiDto.tenDeTaiEn = this.form.get('tenDeTaiEn').value;
    this.detaiDto.linhVucNghienCuuId = this.form.get('linhVucNghienCuu').value;
    this.detaiDto.tinhCapThiet = this.form.get('tinhCapThiet').value;
    this.detaiDto.mucTieu = this.form.get('mucTieu').value;
    this.detaiDto.mucTieuEn = this.form.get('mucTieuEn').value;
    this.detaiDto.noiDungChinh = this.form.get('noiDungChinh').value;
    this.detaiDto.sanPhamDuKien.sanPhamKhoaHoc = this.form.get('sanPhamKhoaHoc').value;
    this.detaiDto.sanPhamDuKien.sanPhamDaoTao = this.form.get('sanPhamDaoTao').value;
    this.detaiDto.sanPhamDuKien.sanPhamUngDung = this.form.get('sanPhamUngDung').value;
    this.detaiDto.sanPhamDuKien.sanPhamKhac = this.form.get('sanPhamKhac').value;
    this.detaiDto.hieuQuaDuKien = this.form.get('hieuQuaDuKien').value;
    this.detaiDto.nhuCauKinhPhiDuKien = this.form.get('nhuCauKinhPhiDuKien').value.toString().replace(/\./g, '');
    this.detaiDto.thoiGianNghienCuuDuKien = this.form.get('thoiGianNghienCuuDuKien').value;
  }

  onSubmit() {
    this.spinner.show();
    if (this.form.valid) {
      this.setVauleToDeTaiDtoFromForm();
      if (this.noiDungDeTai !== null) {
        this.deTaiSvc.updateDetaiDeXuat(this.noiDungDeTai.id, this.detaiDto)
          .subscribe(() => {
            this.alert.success(MessageConstant[this.langCode].MSG_UPDATED_DONE);
            this.spinner.hide();
          });
      } else {
        this.deTaiSvc.createDeTai(this.detaiDto)
          .subscribe((res) => {
            this.alert.success(MessageConstant[this.langCode].MSG_CREATED_DONE);
            this.router.navigate(['/work/my-topic', res.id]);
            this.spinner.hide();
          });
      }
    } else {
      this.alert.warning(MessageConstant[this.langCode].MSG_FIELD_EMPTY);
      this.validatorSvc.validateAllFormFields(this.form);
    }
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

  getAllLinhVuc(): void {
    this.linhVucNghienCuuSvc.findAll()
      .subscribe(res => this.listLinhVuc = res);
  }
}
