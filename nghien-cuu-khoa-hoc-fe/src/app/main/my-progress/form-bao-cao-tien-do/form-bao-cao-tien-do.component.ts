import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { DeTaiAdminService } from 'src/app/core/services/management/de-tai/de-tai-admin.service';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { NoiDungBM07, BaoCaoTienDo, SanPhamBM07s, SanPhamKhacBM07s } from 'src/app/core/models/management/de-tai/bao-cao-tien-do.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { SanPham } from 'src/app/core/models/management/danh-muc/san-pham.model';
import Editor from 'src/assets/libs/ckeditor5/build/ckeditor';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageTooltipConstant } from 'src/app/core/constants/message-tooltip.constant';
import { ToastrService } from 'ngx-toastr';
import { MessageConstant } from 'src/app/core/constants/message.constant';

@Component({
  selector: 'app-form-bao-cao-tien-do',
  templateUrl: './form-bao-cao-tien-do.component.html',
  styleUrls: ['./form-bao-cao-tien-do.component.scss', '../../../../assets/theme/css/main.css']
})
export class FormBaoCaoTienDoComponent implements OnInit {
  @Input() modalData: ModalData<BaoCaoTienDo>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('focusInput') focusInput: ElementRef;
  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  messageTooltipConstant = MessageTooltipConstant;

  editor = Editor;
  cfgEditor = SystemConstant.configEditor5;

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  listLoaiSanPham = SystemConstant.LOAI_SAN_PHAM_TITLE[this.langCode];

  form: FormGroup;
  modalRef: NzModalRef;

  modalDataBM07: ModalData<NoiDungBM07> = new ModalData<NoiDungBM07>();
  modalDataSanPhamBM07: ModalData<SanPhamBM07s> = new ModalData<SanPhamBM07s>();

  listSanPhamNghienCuu: SanPhamBM07s[] = [];
  listSanPhamNghienCuuTemp: SanPhamBM07s[] = [];
  listNoiDungNghienCuu: NoiDungBM07[] = [];
  tableLoading = false;
  modalDefaultWidth = 400;
  listDeTai: DeTai;

  showForm = false;

  constructor(
    private fbd: FormBuilder,
    private validatorSvc: ValidatorService,
    private alert: ToastrService,
    private modalService: NzModalService,
    private activatedRouterSvc: ActivatedRoute,
    private deTaiSvc: DeTaiAdminService,
    private spinner: NgxSpinnerService,
  ) {
    // console.log('iddd', this.activatedRouterSvc.snapshot.params.id);
  }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].RESEARCH_CONTENTS;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].PROGRESS_REPORT,
        link: UrlConstant.ROUTE.MANAGEMENT.TIEN_DO_THUC_HIEN
      }
    ];
    this.createForm();
  }

  createForm() {
    setTimeout(() => {
      this.form = this.fbd.group({
        // I. Thông tin chung
        tenDeTai: ['', [Validators.required]],
        tenDeTaiEn: ['', [Validators.required]],
        maSo: ['', [Validators.required]],
        chuNhiemDeTai: ['', [Validators.required]],
        thoiGianNghienCuuDuKien: ['', [Validators.required]],
        tongKinhPhi: ['', [Validators.required]],

        // II. Đánh giá tình hình thực hiện đề tài
        noiDungBM07s: [[], [Validators.required]],
        // sanPhamBM07s: [[], [Validators.required]],
        sanPhamDaoTaoBM07s: [[]],
        sanPhamKhoaHocBM07s: [[]],
        sanPhamUngDungBM07s: [[]],
        sanPhamKhacBM07s: [[]],
        kinhPhiDuocCap: ['', [Validators.required]],
        kinhPhiDaChi: ['', [Validators.required]],
        kinhPhiDaQuyetToan: ['', [Validators.required]],
        tuDanhGia: ['', [Validators.required]],

        // III. kế hoạch triển khai tiếp theo:
        noiDungNghienCuu: ['', [Validators.required]],
        duKienKetQua: ['', [Validators.required]],
        kinhPhiThucHien: ['', [Validators.required]],
        thoiGianNghiemThuDuKien: [false, [Validators.required]],

        // IV: Kiến nghị
        kienNghi: ['', [Validators.required]],
        thoiGianBaoCaoTienDo: [new Date().toISOString(), [Validators.required]],
      });
      this.getDeTaiById();
      this.showForm = true;
    }, 100);
  }

  getDeTaiById() {
    this.spinner.hide();
    this.deTaiSvc.getDeTaiById(this.activatedRouterSvc.snapshot.params.id)
      .subscribe(res => {
        this.listDeTai = res;
        this.listSanPhamNghienCuu = [].concat.apply([], [res.sanPhamDaoTaos, res.sanPhamKhoaHocs, res.sanPhamUngDungs, res.sanPhamKhacs])
          .map(x => ({
            id: `${[Math.floor(Math.random() * 10000000)]}`, // Temp ID
            sanPhamTheoThuyetMinh: x.sanPham,
            sanPhamId: typeof x.sanPham === 'string' ? '' : x.sanPham.id,
            sanPham: typeof x.sanPham === 'string' ? x.sanPham : '',
            sanPhamDaDatDuoc: '',
            tuDanhGia: '',
            checkBox: false
          }));
        if (this.modalData.action === SystemConstant.ACTION.ADD) {
          this.patchValueAddNew();
        } else {
          this.patchValueFull();
        }
      });
  }

  patchValueAddNew() {
    this.form.patchValue({
      tenDeTai: this.listDeTai.tenDeTai,
      tenDeTaiEn: this.listDeTai.tenDeTaiEn,
      maSo: this.listDeTai.maSo,
      chuNhiemDeTai: this.listDeTai.chuNhiemDeTai.hoTen,
      thoiGianNghienCuuDuKien: this.listDeTai.thoiGianNghienCuuDuKien,
      tongKinhPhi: this.listDeTai.kinhPhiDuKien.tongKinhPhi.toString().replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
      kinhPhiDuocCap: this.listDeTai.kinhPhiDuKien.tongKinhPhi.toString().replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    });
    this.spinner.hide();
  }

  patchValueFull() {
    this.form.patchValue({
      tenDeTai: this.listDeTai.tenDeTai,
      tenDeTaiEn: this.listDeTai.tenDeTaiEn,
      maSo: this.listDeTai.maSo,
      chuNhiemDeTai: this.listDeTai.chuNhiemDeTai.hoTen,
      thoiGianNghienCuuDuKien: this.listDeTai.thoiGianNghienCuuDuKien,
      tongKinhPhi: this.listDeTai.kinhPhiDuKien.tongKinhPhi.toString().replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.'),

      // II. Đánh giá tình hình thực hiện đề tài
      kinhPhiDuocCap: this.listDeTai.kinhPhiDuKien.tongKinhPhi.toString().replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
      kinhPhiDaChi: this.modalData.data.kinhPhiDaChi,
      kinhPhiDaQuyetToan: this.modalData.data.kinhPhiDaQuyetToan.toString().replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
      tuDanhGia: this.modalData.data.tuDanhGia,

      // III. kế hoạch triển khai tiếp theo:
      noiDungNghienCuu: this.modalData.data.noiDungNghienCuu,
      duKienKetQua: this.modalData.data.duKienKetQua,
      kinhPhiThucHien: this.modalData.data.kinhPhiThucHien,
      thoiGianNghiemThuDuKien: this.modalData.data.thoiGianNghiemThuDuKien,

      // IV: Kiến nghị
      kienNghi: this.modalData.data.kienNghi,
    });
    this.listNoiDungNghienCuu = this.modalData.data.noiDungBM07s.map((x) => ({
      id: `${[Math.floor(Math.random() * 10000000)]}`,
      noiDungNghienCuuDaThucHien: x.noiDungNghienCuuDaThucHien,
      noiDungNghienCuuTheoThuyetMinh: x.noiDungNghienCuuTheoThuyetMinh,
      tuDanhGia: x.tuDanhGia
    }));

    this.listSanPhamNghienCuu = this.listSanPhamNghienCuuTemp.map(x => ({
      id: `${[Math.floor(Math.random() * 10000000)]}`, // Temp ID
      sanPhamTheoThuyetMinh: x.sanPhamTheoThuyetMinh,
      sanPhamId: typeof x.sanPhamTheoThuyetMinh === 'string' ? x.sanPhamTheoThuyetMinh : x.sanPhamTheoThuyetMinh.id,
      sanPhamDaDatDuoc: x.sanPhamDaDatDuoc,
      tuDanhGia: x.tuDanhGia,
      checkBox: x.sanPhamDaDatDuoc === '' ? false : true
    }));

    this.spinner.hide();
  }

  themNoiDung(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalDataBM07.action = SystemConstant.ACTION.ADD;
    this.openModalBM07(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  editNoiDung(template: TemplateRef<unknown>, data: NoiDungBM07, modalWidth?: number) {
    this.modalDataBM07.action = SystemConstant.ACTION.EDIT;
    this.modalDataBM07.data = data;
    this.openModalBM07(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  openModalBM07(template: TemplateRef<unknown>, modalWidth: number): void {
    this.modalRef = this.modalService.create({
      nzWidth: modalWidth,
      nzTitle: (this.modalDataBM07.action === SystemConstant.ACTION.ADD ? this.languageData[this.langCode].CREATING
        : this.languageData[this.langCode].EDITING) + this.breadcrumbObj.heading,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
    });
  }

  filterSanPhamTheoLoai(idLoai: string): SanPhamBM07s[] | SanPhamKhacBM07s[] {
    if (idLoai === SystemConstant.LOAI_SAN_PHAM.KHAC) {
      return this.listSanPhamNghienCuu.filter(x => typeof x.sanPhamTheoThuyetMinh === 'string');
    } else {
      return this.listSanPhamNghienCuu.filter(x => typeof x.sanPhamTheoThuyetMinh === 'object'
        && x.sanPhamTheoThuyetMinh.loaiSanPham === idLoai);
    }
  }

  isSanPhamKhac(sanPham: SanPham | string) {
    return typeof sanPham === 'object' ? false : true;
  }

  editSanPham(template: TemplateRef<unknown>, modalWidth: number, data?: SanPhamBM07s): void {
    this.modalDataSanPhamBM07.action = SystemConstant.ACTION.EDIT;
    this.modalDataSanPhamBM07.data = data;
    this.openModalBM07(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  themSanPham() { }


  openModal(template: TemplateRef<unknown>, modalWidth: number): void {
    this.modalRef = this.modalService.create({
      nzWidth: modalWidth,
      nzTitle: (this.modalData.action === SystemConstant.ACTION.ADD ? this.languageData[this.langCode].CREATING
        : this.languageData[this.langCode].EDITING) + this.breadcrumbObj.heading,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
      // nzOnOk: () => this.closeModal(),
      // nzOnCancel: () => this.closeModal()
    });
  }

  filterSanPhamTheoLoaiMappingIdSP(idLoai: string): SanPhamBM07s[] | SanPhamKhacBM07s[] {
    if (idLoai === SystemConstant.LOAI_SAN_PHAM.KHAC) {
      return this.listSanPhamNghienCuu.filter(x => typeof x.sanPhamTheoThuyetMinh === 'string');
    } else {
    }
  }

  handleSanPhamSaveToDB() {
    this.listSanPhamNghienCuu.map(x => {
      if (x.checkBox) {
        x.sanPhamDaDatDuoc = typeof x.sanPhamTheoThuyetMinh === 'string' ? x.sanPhamTheoThuyetMinh : x.sanPhamTheoThuyetMinh.tenSanPham;
      }
    });
    this.form.get('sanPhamDaoTaoBM07s').setValue(this.filterSanPhamTheoLoai(SystemConstant.LOAI_SAN_PHAM.DAO_TAO));
    this.form.get('sanPhamKhoaHocBM07s').setValue(this.filterSanPhamTheoLoai(SystemConstant.LOAI_SAN_PHAM.KHOA_HOC));
    this.form.get('sanPhamUngDungBM07s').setValue(this.filterSanPhamTheoLoai(SystemConstant.LOAI_SAN_PHAM.UNG_DUNG));
    this.form.get('sanPhamKhacBM07s').setValue(this.filterSanPhamTheoLoai(SystemConstant.LOAI_SAN_PHAM.KHAC));
  }

  checkTuDanhGia() {
    return this.listSanPhamNghienCuu.some(x => x.checkBox && x.tuDanhGia === '');
  }

  onSubmit() {
    this.form.get('tongKinhPhi').setValue(this.form.get('tongKinhPhi').value.replace(/\./g, ''));
    this.form.get('kinhPhiDaQuyetToan').setValue(this.form.get('kinhPhiDaQuyetToan').value.replace(/\./g, ''));
    this.form.get('noiDungBM07s').setValue(this.listNoiDungNghienCuu);
    this.handleSanPhamSaveToDB();
    if (this.form.valid) {
      if (this.modalData.action === SystemConstant.ACTION.ADD) {
        this.deTaiSvc.createBaoCaoTienDo(this.activatedRouterSvc.snapshot.params.id, this.form.value)
          .subscribe(() => {
            this.returnData.emit(true);
            this.alert.success(MessageConstant[this.langCode].MSG_CREATED_DONE);
          });
      } else {
        this.deTaiSvc.updateBaoCaoTienDo(this.activatedRouterSvc.snapshot.params.id, this.form.value)
          .subscribe(() => {
            this.returnData.emit(true);
            this.alert.success(MessageConstant[this.langCode].MSG_UPDATED_DONE);
          });
      }
    } else {
      this.alert.warning(MessageConstant[this.langCode].MSG_FIELD_EMPTY);
      this.validatorSvc.validateAllFormFields(this.form);
    }
  }

  onCancel() {
    this.returnData.emit(false);
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

  closeModalNoiDung(status: boolean): void {
    if (status) {

    }
    this.modalRef.destroy();
  }

  closeModalSanPham(status: boolean): void {
    if (status) {

    }
    this.modalRef.destroy();
  }

  returnDataModalNoiDung(data: NoiDungBM07) {
    if (this.listNoiDungNghienCuu.findIndex(x => x.id === data.id) >= 0) {
      this.listNoiDungNghienCuu[this.listNoiDungNghienCuu.findIndex(x => x.id === data.id)]
        = data;
      this.listNoiDungNghienCuu = [...this.listNoiDungNghienCuu];
    } else {
      this.listNoiDungNghienCuu.push(data);
      this.listNoiDungNghienCuu = [...this.listNoiDungNghienCuu];
    }
  }

  returnDataModalNSanPham(data: SanPhamBM07s) {
    if (data) {
      this.listSanPhamNghienCuu[this.listSanPhamNghienCuu.findIndex(x => x.id === data.id)]
        = data;
    }
  }

  forcusInput(check: boolean) {
    setTimeout(() => {
      if (!check) {
        // this.focusInput.nativeElement.focus();
      } else { }
    }, 100);
  }
}
