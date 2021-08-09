import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { DeTaiAdminService } from 'src/app/core/services/management/de-tai/de-tai-admin.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { SanPhamBM07s, NoiDungBM07, BaoCaoTienDo, SanPhamKhacBM07s } from 'src/app/core/models/management/de-tai/bao-cao-tien-do.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { SanPham } from 'src/app/core/models/management/danh-muc/san-pham.model';
import Editor from 'src/assets/libs/ckeditor5/build/ckeditor';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageTooltipConstant } from 'src/app/core/constants/message-tooltip.constant';

@Component({
  selector: 'app-form-bao-cao-tien-do-share',
  templateUrl: './form-bao-cao-tien-do.component.html',
  styleUrls: ['./form-bao-cao-tien-do.component.scss', '../../../../assets/theme/css/main.css']
})
export class FormBaoCaoTienDoComponent implements OnInit {
  @Input() modalData: ModalData<BaoCaoTienDo>;
  @Input() modalDataId: ModalData<string>;  //id đề tài
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();
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
    private deTaiSvc: DeTaiAdminService,
    private spinner: NgxSpinnerService,
  ) { }

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
        sanPhamDaoTaoBM07s: [[], [Validators.required]],
        sanPhamKhoaHocBM07s: [[], [Validators.required]],
        sanPhamUngDungBM07s: [[], [Validators.required]],
        sanPhamKhacBM07s: [[], [Validators.required]],
        kinhPhiDuocCap: ['', [Validators.required]],
        kinhPhiDaChi: ['', [Validators.required]],
        kinhPhiDaQuyetToan: ['', [Validators.required]],
        tuDanhGia: [{ value: '', disabled: true }, [Validators.required]],

        // III. kế hoạch triển khai tiếp theo:
        noiDungNghienCuu: [{ value: '', disabled: true }, [Validators.required]],
        duKienKetQua: [{ value: '', disabled: true }, [Validators.required]],
        kinhPhiThucHien: ['', [Validators.required]],
        thoiGianNghiemThuDuKien: [false, [Validators.required]],

        // IV: Kiến nghị
        kienNghi: [{ value: '', disabled: true }, [Validators.required]],
        thoiGianBaoCaoTienDo: [new Date().toISOString(), [Validators.required]],
      });
      this.getDeTaiById();
      this.showForm = true;
    }, 100);
  }

  getDeTaiById() {
    this.deTaiSvc.getDeTaiById(this.modalDataId.data)
      .subscribe(res => {
        this.listDeTai = res;
        this.patchValueFull();
      });
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

    // this.listSanPhamNghienCuu = this.listSanPhamNghienCuuTemp.map(x => ({
    //   id: `${[Math.floor(Math.random() * 10000000)]}`, // Temp ID
    //   sanPhamTheoThuyetMinh: x.sanPhamTheoThuyetMinh,
    //   sanPhamId: typeof x.sanPhamTheoThuyetMinh === 'string' ? x.sanPhamTheoThuyetMinh : x.sanPhamTheoThuyetMinh.id,
    //   sanPhamDaDatDuoc: x.sanPhamDaDatDuoc,
    //   tuDanhGia: x.tuDanhGia,
    //   checkBox: x.sanPhamDaDatDuoc === '' ? false : true
    // }));
    this.listSanPhamNghienCuu = [].concat.apply([], [this.modalData.data.sanPhamDaoTaoBM07s, this.modalData.data.sanPhamKhoaHocBM07s
      , this.modalData.data.sanPhamUngDungBM07s, this.modalData.data.sanPhamKhacBM07s])
      .map(x => ({
        id: `${[Math.floor(Math.random() * 10000000)]}`, // Temp ID
        sanPhamTheoThuyetMinh: x.sanPhamTheoThuyetMinh,
        sanPhamId: typeof x.sanPhamTheoThuyetMinh === 'string' ? '' : x.sanPhamTheoThuyetMinh?.id,
        sanPham: typeof x.sanPhamTheoThuyetMinh === 'string' ? x.sanPhamTheoThuyetMinh : '',
        sanPhamDaDatDuoc: x.sanPhamDaDatDuoc,
        tuDanhGia: x.tuDanhGia,
        checkBox: x.sanPhamDaDatDuoc === '' ? false : true
      }));
    this.spinner.hide();
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

  filterSanPhamTheoLoaiMappingIdSP(idLoai: string): SanPhamBM07s[] | SanPhamKhacBM07s[] {
    if (idLoai === SystemConstant.LOAI_SAN_PHAM.KHAC) {
      return this.listSanPhamNghienCuu.filter(x => typeof x.sanPhamTheoThuyetMinh === 'string');
    } else {
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

}
