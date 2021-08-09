import { MessageConstant } from './../../../core/constants/message.constant';
import { MessageTooltipConstant } from 'src/app/core/constants/message-tooltip.constant';
import Editor from 'src/assets/libs/ckeditor5/build/ckeditor';
import { CauHinhBieuMau } from './../../../core/models/management/cau-hinh/cau-hinh-bieu-mau.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { SanPham } from 'src/app/core/models/management/danh-muc/san-pham.model';
import { SanPhamBM07s, SanPhamKhacBM07s } from 'src/app/core/models/management/de-tai/bao-cao-tien-do.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { CauHinhBieuMauService } from 'src/app/core/services/management/cau-hinh/cau-hinh-bieu-mau.service';
import { DeTaiAdminService } from 'src/app/core/services/management/de-tai/de-tai-admin.service';
import { KetQuaNghienCuuService } from 'src/app/core/services/management/de-tai/ket-qua-nghien-cuu.service';
import { ToastrService } from 'ngx-toastr';
import { ValidatorService } from 'src/app/core/services/common/validator.service';

@Component({
  selector: 'app-form-research-results',
  templateUrl: './form-research-results.component.html',
  styleUrls: ['./form-research-results.component.scss', './../../../../assets/theme/css/main.css'
    , './../../../../assets/theme/css/preload.css']
})
export class FormResearchResultsComponent implements OnInit {
  @Input() modalData: ModalData<DeTai>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  //Ckeditor
  editor = Editor;
  cfgEditor = SystemConstant.configEditor5;

  messageTooltipConstant = MessageTooltipConstant;

  form: FormGroup;

  isShown = false;
  isShowSpin = false;
  haveThongTinKetQua = false;

  tableLoading = false;
  listGiaiTrinhChinhSua: DeTai[] = [];
  listSanPhamNghienCuu: SanPhamBM07s[] = [];
  listLoaiSanPham = SystemConstant.LOAI_SAN_PHAM_TITLE[this.langCode];
  deTai: DeTai;
  cauHinhBieuMauActive: CauHinhBieuMau;

  constructor(
    private fbd: FormBuilder,
    private ketQuaNghienCuuSvc: KetQuaNghienCuuService,
    private validatorSvc: ValidatorService,
    private alert: ToastrService,
    private deTaiSvc: DeTaiAdminService,
    private spinner: NgxSpinnerService,
    private activatedRouterSvc: ActivatedRoute,
    private cauHinhBieuMauSvc: CauHinhBieuMauService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getCauHinhBieuMau();
    this.createForm();
    // this.getDeTaiById();
  }

  createForm() {
    this.form = this.fbd.group({
      hieuQuaPhuongThucChuyenGiao: ['', [Validators.required]],
      hieuQuaPhuongThucChuyenGiaoEn: ['', [Validators.required]],
      ketQuaNghienCuu: ['', [Validators.required]],
      ketQuaNghienCuuEn: ['', [Validators.required]],
      sanPhamDaoTaos: [[]],
      sanPhamKhoaHocs: [[]],
      sanPhamUngDungs: [[]],
      sanPhamKhacs: [[]],
      tinhMoi: ['', [Validators.required]],
      tinhMoiEn: ['', [Validators.required]]
    });
    this.getDeTaiById();
  }

  patchValue() {
    this.form.patchValue({
      hieuQuaPhuongThucChuyenGiao: this.deTai.thongTinKetQua.hieuQuaPhuongThucChuyenGiao,
      hieuQuaPhuongThucChuyenGiaoEn: this.deTai.thongTinKetQua.hieuQuaPhuongThucChuyenGiaoEn,
      ketQuaNghienCuu: this.deTai.thongTinKetQua.ketQuaNghienCuu,
      ketQuaNghienCuuEn: this.deTai.thongTinKetQua.ketQuaNghienCuuEn,
      sanPhamDaoTaos: this.deTai.thongTinKetQua.sanPhamDaoTaos,
      sanPhamKhoaHocs: this.deTai.thongTinKetQua.sanPhamKhoaHocs,
      sanPhamUngDungs: this.deTai.thongTinKetQua.sanPhamUngDungs,
      sanPhamKhacs: this.deTai.thongTinKetQua.sanPhamKhacs,
      tinhMoi: this.deTai.thongTinKetQua.tinhMoi,
      tinhMoiEn: this.deTai.thongTinKetQua.tinhMoiEn
    });
    this.listSanPhamNghienCuu = [].concat.apply([], [this.deTai.thongTinKetQua.sanPhamDaoTaos, this.deTai.thongTinKetQua.sanPhamKhoaHocs
      , this.deTai.thongTinKetQua.sanPhamUngDungs, this.deTai.thongTinKetQua.sanPhamKhacs]);
    this.listSanPhamNghienCuu.map(x => x.checkBox = true);

    //Phần gán biến hiển thị những cái cần hiện
    this.isShown = true;
    this.haveThongTinKetQua = true;
    this.spinner.hide();
  }

  getCauHinhBieuMau() {
    this.cauHinhBieuMauSvc.getCauHinhBieuMau()
      .subscribe(res => {
        this.cauHinhBieuMauActive = res;
      });
  }

  getDeTaiById() {
    this.deTaiSvc.getDeTaiById(this.activatedRouterSvc.snapshot.params.id)
      .subscribe(res => {
        this.deTai = res;
        this.listSanPhamNghienCuu = [].concat.apply([], [res.sanPhamDaoTaos, res.sanPhamKhoaHocs, res.sanPhamUngDungs, res.sanPhamKhacs])
          .map(x => ({
            id: `${[Math.floor(Math.random() * 10000000)]}`, // Temp ID
            sanPhamTheoThuyetMinh: x.sanPham,
            sanPhamId: typeof x.sanPham === 'string' ? x.sanPham : x.sanPham.id,
            sanPham: typeof x.sanPham === 'string' ? x.sanPham : x.sanPham.id,
            sanPhamDaDatDuoc: '',
            tuDanhGia: '',
            checkBox: false
          }));
        if (res.thongTinKetQua) {
          this.patchValue();
        } else {
          this.spinner.hide();
        }
      });
  }

  themNoiDung() { }
  themSanPham() { }

  handleSanPhamSaveToDB() {
    this.listSanPhamNghienCuu.map(x => {
      if (x.checkBox) {
        x.sanPhamDaDatDuoc = typeof x.sanPhamTheoThuyetMinh === 'string' ? x.sanPhamTheoThuyetMinh : x.sanPhamTheoThuyetMinh.tenSanPham;
      }
    });
    this.form.get('sanPhamDaoTaos').setValue(this.filterSanPhamTheoLoai(SystemConstant.LOAI_SAN_PHAM.DAO_TAO));
    this.form.get('sanPhamKhoaHocs').setValue(this.filterSanPhamTheoLoai(SystemConstant.LOAI_SAN_PHAM.KHOA_HOC));
    this.form.get('sanPhamUngDungs').setValue(this.filterSanPhamTheoLoai(SystemConstant.LOAI_SAN_PHAM.UNG_DUNG));
    this.form.get('sanPhamKhacs').setValue(this.filterSanPhamTheoLoai(SystemConstant.LOAI_SAN_PHAM.KHAC));
  }

  checkFullSanPham() {
    return this.listSanPhamNghienCuu.some(x => !x.checkBox || x.tuDanhGia === '');
  }

  onSubmit() {
    this.handleSanPhamSaveToDB();
    if (this.form.valid) {
      this.ketQuaNghienCuuSvc.updateKetQuaNghienCuu(this.form.value, this.activatedRouterSvc.snapshot.params.id)
        .subscribe(() => {
          this.returnData.emit(true);
          this.alert.success(MessageConstant[this.langCode].MSG_UPDATED_DONE);
          this.router.navigate(['/work/research-results']);
        });
    } else {
      this.validatorSvc.validateAllFormFields(this.form);
    }
  }


  onCancel() {
    this.isShown = false;
    // window.scroll(0, 0);
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
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

  toggleShow() {
    if (!this.isShown) {
      this.isShowSpin = true;
      setTimeout(() => {
        this.isShowSpin = false;
        this.isShown = !this.isShown;
      }, 500);
    } else {
      this.isShown = !this.isShown;
    }
  }

  //Xử lý sản phẩm
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

  forcusInput(check: boolean) {
    setTimeout(() => {
      if (!check) {
        // this.focusInput.nativeElement.focus();
      } else { }
    }, 100);
  }

  getInnerHTML(val: string) {
    return val.replace(/(<([^>]+)>)/ig, '');
  }

}
