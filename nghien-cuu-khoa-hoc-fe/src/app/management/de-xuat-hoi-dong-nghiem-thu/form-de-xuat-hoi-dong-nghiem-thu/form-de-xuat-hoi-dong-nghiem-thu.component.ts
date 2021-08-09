import { HoiDongNghiemThu } from './../../../core/models/management/hoi-dong/hoi-dong-nghiem-thu.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageTooltipConstant } from 'src/app/core/constants/message-tooltip.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ThoiGianQuyTrinh } from 'src/app/core/models/management/cau-hinh/thoi-gian-quy-trinh.model';
import { HocHam } from 'src/app/core/models/management/danh-muc/hoc-ham.model';
import { HocVi } from 'src/app/core/models/management/danh-muc/hoc-vi.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { NhanVienEd } from 'src/app/core/models/management/de-tai/nhan-vien-ed.model';
import { ThanhVienHoiDongNghiemThuDtos } from 'src/app/core/models/management/de-tai/thanh-vien-hoi-dong-nghiem-thu.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { HocHamService } from 'src/app/core/services/management/danh-muc/hoc-ham.service';
import { HocViService } from 'src/app/core/services/management/danh-muc/hoc-vi.service';
import { DeTaiAdminService } from 'src/app/core/services/management/de-tai/de-tai-admin.service';
import { HoiDongNghiemThuService } from 'src/app/core/services/management/hoi-dong/hoi-dong-nghiem-thu.service';
import { NhanVienService } from 'src/app/core/services/user/nhan-vien.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-form-de-xuat-hoi-dong-nghiem-thu',
  templateUrl: './form-de-xuat-hoi-dong-nghiem-thu.component.html',
  styleUrls: ['./form-de-xuat-hoi-dong-nghiem-thu.component.scss']
})
export class FormDeXuatHoiDongNghiemThuComponent implements OnInit {
  @Input() modalDataDeXuat: ModalData<HoiDongNghiemThu>;
  @Input() isGeneratingCouncil: boolean;
  @Input() idHoiDongEditTheoDeTai: string;
  @Input() currentTab: number;
  @Output() returnData: EventEmitter<{
    check: boolean;
    currentTab: number;
  }> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  messageTooltipConstant = MessageTooltipConstant;

  listChucVuHoiDongDeXuat = SystemConstant.CHUC_VU_HOI_DONG_DE_XUAT_TITLE[this.langCode];

  form: FormGroup;
  isFormTouched = false;

  listDetaiSelect: DeTai[] = [];
  searchDeTaiValueChanged = new Subject<string>();

  searchValueTextChanged = new Subject<string>();
  searchValueNhanVien = new Subject<string>();
  thoiGianQuyTrinhId = '';
  listDeTaiByChuNhiem: Paginate<DeTai> = new Paginate<DeTai>();
  searchValue = '';
  searchNhanVienValue = '';
  listThoiGianQuyTrinh: ThoiGianQuyTrinh[] = [];

  listThanhVienDeXuat: ThanhVienHoiDongNghiemThuDtos[] = [];
  thanhVienDeXuat = new ThanhVienHoiDongNghiemThuDtos();

  listThanhVienThuKyVaChuTich: ThanhVienHoiDongNghiemThuDtos[] = [];


  listChucVuHoiDong = SystemConstant.CHUC_VU_HOI_DONG_KHOI_TAO_TITLE[this.langCode];
  listChucVuHoiDongTemp = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listThanhVien: ThanhVienHoiDongNghiemThuDtos[] = []; // ThanhVienHoiDong
  // listThanhVienTemp: NhanVienEd[] = [];
  listThanhVienTemp: ThanhVienHoiDongNghiemThuDtos[] = [];


  listNhanVienSearch: NhanVienEd[] = [];
  listNhanVienSelect: NhanVienEd[] = [];

  listHocHam: HocHam[] = [];
  listHocVi: HocVi[] = [];

  showSpin = false;

  editCache: {
    [key: string]: {
      edit: boolean;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: any; // ThanhVienHoiDong
    };
  } = {};
  editingId = '';

  constructor(
    private fb: FormBuilder,
    private validatorSvc: ValidatorService,
    private alert: ToastrService,
    // private spinner: NgxSpinnerService,
    private deTaiSvc: DeTaiAdminService,
    private nhanVienSvc: NhanVienService,
    private hocHamSvc: HocHamService,
    private hocViSvc: HocViService,
    private hoiDongNghiemThuSvc: HoiDongNghiemThuService,
  ) { }

  ngOnInit() {
    this.createForm();
    this.mapHoiDong();
    if (this.modalDataDeXuat.action === SystemConstant.ACTION.EDIT) {
      if (this.idHoiDongEditTheoDeTai) {
        // Nếu có idHoiDongEditTheoDeTai nghĩa là đang edit hội đồng của 1 đề tài
        // Load lại data của đề tài đó, kèm danh sách mà TĐV đã đề xuất để admin thêm bớt,
        // sau đó patch value
      } else {
        // ngược lại, nghĩa là đang tạo hội đồng chung cho tất cả đề tài (isGeneratingCouncil = true)
        // hoặc tạo hđ chung cho 1 số đề tài (isGeneratingCouncil = idHoiDongEditTheoDeTai = null)
        this.form.patchValue({
          // tenHoiDong: this.modalData.data.tenHoiDong,
          // soQuyetDinhThanhLap: this.modalData.data.soQuyetDinhThanhLap,
        });
        // this.listThanhVien = this.modalData.data.danhSachThanhVien;
      }
    }
    this.searchValueNhanVien.pipe(debounceTime(300))
      .subscribe(searchValue => {
        this.searchNhanVien(searchValue);
      });
    this.getAllHocVi();
    this.getAllHocHam();
  }

  createForm() {
    this.form = this.fb.group({
      // chuyenMon: ['IT', [Validators.required]],
      // donViCongTac: ['HCMUS', [Validators.required]],
      // email: ['nguyenvana@gmail.com', [Validators.required]],
      // hoTen: ['Nguyễn Văn A', [Validators.required]],
      // hocHamId: [null, [Validators.required]],
      // hocViId: [null, [Validators.required]],
      // nhiemVuHoiDong: ['PHAN_BIEN_NGOAI_TRUONG', [Validators.required]],
      // soDienThoai: ['0836526958', [Validators.required]],
      // trangThaiDuyetThanhVien: [null],

      chuyenMon: ['', [Validators.required]],
      donViCongTac: ['', [Validators.required]],
      email: ['', [Validators.required]],
      hoTen: ['', [Validators.required]],
      hocHamId: [null, [Validators.required]],
      hocViId: [null, [Validators.required]],
      nhiemVuHoiDong: ['', [Validators.required]],
      soDienThoai: ['', [Validators.required]],
      trangThaiDuyetThanhVien: [null],
    });
    if (this.modalDataDeXuat.action === SystemConstant.ACTION.EDIT) {
      this.patchValue();
    } else {
      this.mapThanhVienThuKyVaChuTich();
    }
  }

  patchValue() {
    this.listThanhVienThuKyVaChuTich =
      [...this.modalDataDeXuat.data.thanhVienHoiDongs.filter(x =>
        x.nhiemVuHoiDong === SystemConstant.CHUC_VU_HOI_DONG_KHOI_TAO.CHU_TICH
        || x.nhiemVuHoiDong === SystemConstant.CHUC_VU_HOI_DONG_KHOI_TAO.THU_KY)
        .map(x => ({
          chuyenMon: x.chuyenMon,
          donViCongTac: x.donViCongTac,
          email: x.email,
          hoTen: x.hoTen,
          hocHam: this.langCode === 'vi' ? x.hocHam.tenHocHam : x.hocHam.tenHocHamEn,
          hocHamId: x.hocHam.id,
          hocVi: this.langCode === 'vi' ? x.hocVi.tenHocVi : x.hocVi.tenHocViEn,
          hocViId: x.hocVi.id,
          nhiemVuHoiDong: x.nhiemVuHoiDong,
          soDienThoai: x.soDienThoai,
          trangThaiDuyetThanhVien: x.trangThaiDuyetThanhVien,
          isEdit: false
        }))
      ];

    this.listThanhVienTemp = [...this.modalDataDeXuat.data.thanhVienHoiDongs.filter(x =>
      x.nhiemVuHoiDong !== SystemConstant.CHUC_VU_HOI_DONG_KHOI_TAO.CHU_TICH
      && x.nhiemVuHoiDong !== SystemConstant.CHUC_VU_HOI_DONG_KHOI_TAO.THU_KY)
      .map(x => ({
        chuyenMon: x.chuyenMon,
        donViCongTac: x.donViCongTac,
        email: x.email,
        hoTen: x.hoTen,
        hocHam: this.langCode === 'vi' ? x.hocHam.tenHocHam : x.hocHam.tenHocHamEn,
        hocHamId: x.hocHam.id,
        hocVi: this.langCode === 'vi' ? x.hocVi.tenHocVi : x.hocVi.tenHocViEn,
        hocViId: x.hocVi.id,
        nhiemVuHoiDong: x.nhiemVuHoiDong,
        soDienThoai: x.soDienThoai,
        trangThaiDuyetThanhVien: x.trangThaiDuyetThanhVien,
        isEdit: false
      }))
    ];
    this.listThanhVien = this.listThanhVienTemp;
  }

  searchNhanVien(searchValue?: string) {
    this.nhanVienSvc.searchNhanVien(searchValue)
      .subscribe(res => {
        this.listNhanVienSearch = res;
      });
  }

  mapHoiDong() {
    this.listChucVuHoiDongTemp = this.listChucVuHoiDong.map(x => ({
      id: x.id,
      title: x.title,
      status: false
    }));

    this.listChucVuHoiDongDeXuat = this.listChucVuHoiDongDeXuat.map(x => ({
      id: x.id,
      title: x.title,
      status: false
    }));

  }

  getNhanVienByEmail(email: string) {
    this.nhanVienSvc.getByEmail(email)
      .subscribe(res => {
        if (this.checkNhanVienExist(email)) {
          this.alert.warning(this.languageData[this.langCode].EMPLOYEE_IS_AVAILABLE);
        } else {
          this.addNhanVienToList(this.mapOneOject(res));
        }
      }, () => { this.alert.warning(this.languageData[this.langCode].EMPLOYEE_IS_AVAILABLE); });
  }

  checkNhanVienExist(email: string) {
    return this.modalDataDeXuat.data.thanhVienHoiDongs.some(x => x.email === email);
  }

  mapThanhVienThuKyVaChuTich() {
    this.listThanhVienThuKyVaChuTich = this.modalDataDeXuat.data.thanhVienHoiDongs.map(x => ({
      chuyenMon: x.chuyenMon,
      donViCongTac: x.donViCongTac,
      email: x.email,
      hoTen: x.hoTen,
      hocHam: this.langCode === 'vi' ? x.hocHam.tenHocHam : x.hocHam.tenHocHamEn,
      hocHamId: x.hocHam.id,
      hocVi: this.langCode === 'vi' ? x.hocVi.tenHocVi : x.hocVi.tenHocViEn,
      hocViId: x.hocVi.id,
      nhiemVuHoiDong: x.nhiemVuHoiDong,
      soDienThoai: x.soDienThoai,
      trangThaiDuyetThanhVien: true,
      isEdit: false,
    }));
  }

  mapOneOject(nhanVien: NhanVienEd): ThanhVienHoiDongNghiemThuDtos {
    return {
      chuyenMon: '',
      donViCongTac: nhanVien.donVi,
      email: nhanVien.email,
      hoTen: nhanVien.hoTen,
      hocHamId: this.mergeHrmHocHamId(nhanVien?.hocHam?.tenHocHam),
      hocHam: this.mergeHrmHocHamName(nhanVien?.hocHam?.tenHocHam),
      hocViId: this.mergeHrmHocViId(nhanVien?.hocVi?.tenHocVi),
      hocVi: this.mergeHrmHocViName(nhanVien?.hocVi?.tenHocVi),
      nhiemVuHoiDong: '',
      soDienThoai: nhanVien.dienThoaiDiDong,
      trangThaiDuyetThanhVien: null,
      isEdit: false
    };
  }

  getAllHocHam() {
    this.hocHamSvc.findAll()
      .subscribe(res => {
        this.listHocHam = res;
      });
  }

  getAllHocVi() {
    this.hocViSvc.findAll()
      .subscribe(res => {
        this.listHocVi = res;
      });
  }

  addNhanVienNgoaiTruong() {
    if (this.form.valid) {
      this.addNhanVienToList(
        {
          chuyenMon: this.form.get('chuyenMon').value,
          donViCongTac: this.form.get('donViCongTac').value,
          email: this.form.get('email').value,
          hoTen: this.form.get('hoTen').value,
          hocHamId: this.form.get('hocHamId').value.id,
          hocHam: this.langCode === 'vi' ? this.form.get('hocHamId').value.tenHocHam : this.form.get('hocHamId').value.tenHocHamEn,
          hocViId: this.form.get('hocViId').value.id,
          hocVi: this.langCode === 'vi' ? this.form.get('hocViId').value.tenHocVi : this.form.get('hocViId').value.tenHocViEn,
          nhiemVuHoiDong: this.form.get('nhiemVuHoiDong').value,
          soDienThoai: this.form.get('soDienThoai').value,
          trangThaiDuyetThanhVien: null,
          isEdit: false
        }
      );
    } else {
      this.validatorSvc.validateAllFormFields(this.form);
    }
  }

  addNhanVienToList(nhanVien: ThanhVienHoiDongNghiemThuDtos) {
    if (!this.listThanhVien.some(x => x.email === nhanVien.email)) {
      this.listThanhVien.push(nhanVien);
      this.listThanhVienTemp = [...this.listThanhVien];
      this.form.reset();
    } else {
      this.alert.error(this.languageData[this.langCode].EMPLOYEE_IS_AVAILABLE);
    }
  }

  mergeHrmHocHamId(tenHocHam: string) {
    if (tenHocHam) {
      return this.listHocHam[this.listHocHam.findIndex(x => x.tenHocHam === tenHocHam)].id;
    } else {
      return '';
    }
  }

  mergeHrmHocHamName(tenHocHam: string) {
    if (tenHocHam) {
      return this.langCode === 'vi' ? this.listHocHam[this.listHocHam.findIndex(x => x.tenHocHam === tenHocHam)].tenHocHam
        : this.listHocHam[this.listHocHam.findIndex(x => x.tenHocHam === tenHocHam)].tenHocHamEn;
    } else {
      return '';
    }
  }

  mergeHrmHocViId(tenHocVi: string) {
    if (tenHocVi) {
      return this.listHocVi[this.listHocVi.findIndex(x => x.tenHocVi === tenHocVi)].id;
    } else {
      return '';
    }
  }

  mergeHrmHocViName(tenHocVi: string) {
    if (tenHocVi) {
      return this.langCode === 'vi' ? this.listHocVi[this.listHocVi.findIndex(x => x.tenHocVi === tenHocVi)].tenHocVi
        : this.listHocVi[this.listHocVi.findIndex(x => x.tenHocVi === tenHocVi)].tenHocViEn;
    } else {
      return '';
    }
  }

  onCancel() {
    this.returnData.emit(
      {
        check: false,
        currentTab: this.currentTab
      }
    );
  }

  onSubmit() {
    this.hoiDongNghiemThuSvc.deXuatHoiDongNghiemThu(this.modalDataDeXuat.data.id,
      this.listThanhVienThuKyVaChuTich.concat(this.listThanhVien))
      .subscribe(() => {
        this.alert.success(MessageConstant[this.langCode].MGS_SUGGESTED_SUCCESS);
        this.returnData.emit({
          check: true,
          currentTab: this.currentTab
        });
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

  startEdit(email: string): void {
    this.listThanhVienTemp.map(x => x.isEdit = false);
    this.listThanhVienTemp[this.listThanhVienTemp.findIndex(item => item.email === email)].isEdit = true;
  }

  cancelEdit(email: string): void {
    this.listThanhVienTemp[this.listThanhVienTemp.findIndex(item => item.email === email)]
      = this.listThanhVien[this.listThanhVienTemp.findIndex(item => item.email === email)];
    this.listThanhVienTemp[this.listThanhVienTemp.findIndex(item => item.email === email)].isEdit = false;
  }

  saveEdit(email: string, vaiTro: string): void {
    this.listThanhVien[this.listThanhVienTemp.findIndex(item => item.email === email)]
      = this.listThanhVienTemp[this.listThanhVienTemp.findIndex(item => item.email === email)];
    this.listThanhVienTemp[this.listThanhVienTemp.findIndex(item => item.email === email)].isEdit = false;
    if (vaiTro) {
      // this.listChucVuHoiDongTemp[this.listChucVuHoiDongTemp.findIndex(x => x.id === vaiTro)].status = true;
    }
  }

  deleteCell(email: string, vaiTro: string): void {
    this.listThanhVienTemp.splice(this.listThanhVienTemp.findIndex(x => x.email === email), 1);
    this.listThanhVien = this.listThanhVienTemp;
    if (vaiTro) {
      // this.listChucVuHoiDongTemp[this.listChucVuHoiDongTemp.findIndex(x => x.id === vaiTro)].status = false;
    }
  }

  ngModelChangePossition(event: string, index: number) {
    const arr = [...this.listThanhVienTemp];
    arr.splice(index, 1);
    if (!this.listThanhVienTemp.some(x => x.nhiemVuHoiDong === '') &&
      arr.some(x => x.nhiemVuHoiDong === event)) {
      this.listThanhVienTemp.map(x => {
        x.nhiemVuHoiDong = '';
      });
      this.listChucVuHoiDongTemp.map(x => {
        x.status = false;
      });
      this.listThanhVienTemp[index].nhiemVuHoiDong = event;
    }
  }

  ngModelChangeHocHam(event: string, index: number) {
    this.listThanhVienTemp[index].hocHam = this.langCode === 'vi' ?
      this.listHocHam[this.listHocHam.findIndex(x => x.id === event)].tenHocHam
      : this.listHocHam[this.listHocHam.findIndex(x => x.id === event)].tenHocHamEn;
  }

  ngModelChangeHocVi(event: string, index: number) {
    this.listThanhVienTemp[index].hocVi = this.langCode === 'vi' ?
      this.listHocVi[this.listHocVi.findIndex(x => x.id === event)].tenHocVi
      : this.listHocVi[this.listHocVi.findIndex(x => x.id === event)].tenHocViEn;
  }

  checkEdit() {
    return this.listThanhVienTemp.some(x => x.isEdit);
  }

  checkNull() {
    return this.listThanhVien.map(thanhVien => Object.values(thanhVien).some(x => x === '')).some(y => y);
  }

  returnMessageWarning() {
    if (this.checkEdit()) {
      return this.messageTooltipConstant[this.langCode].PLEASE_TURN_OFF_EDIT;
    }
    if (this.listThanhVien.length < 2) {
      return this.messageTooltipConstant[this.langCode].NOT_ENOUGH_MEMBERS;
    }
    if (this.checkNull()) {
      return this.messageTooltipConstant[this.langCode].PLEASE_FILL_IN_ALL_EMPLOYEE_DATA_FIELDS;
    }
  }

  getNameOfChucVu(id: string): string {
    const chucVu = this.listChucVuHoiDong.find(x => x.id === id);
    return chucVu ? chucVu.title : '';
  }

  getNameOfChucVuDeXuat(id: string): string {
    const chucVu = this.listChucVuHoiDongDeXuat.find(x => x.id === id);
    return chucVu ? chucVu.title : '';
  }

  onSearchDeTaiSelect(valueSearch: string) {
    this.searchDeTaiValueChanged.next(valueSearch);
  }

  changeProgeressTimeLine(thoiGianQuyTrinhId, searchValue?: string) {
    this.deTaiSvc.getDetaiByTimeLineAndStatus(
      thoiGianQuyTrinhId,
      [SystemConstant.TRANG_THAI_DE_TAI.KY_HOP_DONG],
      this.listDeTaiByChuNhiem.currentPage - 1,
      this.listDeTaiByChuNhiem.limit,
      searchValue)
      .subscribe(res => {
        this.listDeTaiByChuNhiem.currentPage = res.pageable.pageNumber + 1;
        this.listDeTaiByChuNhiem.limit = res.pageable.pageSize;
        this.listDeTaiByChuNhiem.totalPage = res.totalPages;
        this.listDeTaiByChuNhiem.totalItem = res.totalElements;
        this.listDeTaiByChuNhiem.data = res.content;
      });
  }

  clickShowSpin() {
    this.showSpin = true;
    setTimeout(() => {
      this.showSpin = false;
    }, 300);
  }

}
