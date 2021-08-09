import { HoiDongKiemDuyetService } from './../../../../core/services/management/hoi-dong/hoi-dong-kiem-duyet.service';
import { LinhVucNghienCuuService } from 'src/app/core/services/management/danh-muc/linh-vuc-nghien-cuu.service';
import { NhanVienService } from './../../../../core/services/user/nhan-vien.service';
import { Paginate } from './../../../../shared/widget/paginate/paginate.model';
import { DeTaiAdminService } from './../../../../core/services/management/de-tai/de-tai-admin.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
// import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { NhanVienEd } from 'src/app/core/models/management/de-tai/nhan-vien-ed.model';
import { LinhVucNghienCuu } from 'src/app/core/models/management/danh-muc/linh-vuc-nghien-cuu.model';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { HoiDongDuyetThuyetMinhGet } from 'src/app/core/models/management/hoi-dong/hoi-dong-duyet-thuyet-minh-get.model';
import { MessageTooltipConstant } from 'src/app/core/constants/message-tooltip.constant';

@Component({
  selector: 'app-form-hd-xet-duyet',
  templateUrl: './form-hd-xet-duyet.component.html',
  styleUrls: ['./form-hd-xet-duyet.component.scss']
})
export class FormHdXetDuyetComponent implements OnInit {

  @Input() modalData: ModalData<HoiDongDuyetThuyetMinhGet>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  messageTooltipConstant = MessageTooltipConstant;
  form: FormGroup;
  isFormTouched = false;

  listChucVuHoiDong = SystemConstant.CHUC_VU_HOI_DONG_TITLE[this.langCode];
  listChucVuHoiDongTemp = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listThanhVien: NhanVienEd[] = []; // ThanhVienHoiDong
  listThanhVienTemp: NhanVienEd[] = [];
  editCache: {
    [key: string]: {
      edit: boolean;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: any; // ThanhVienHoiDong
    };
  } = {};
  editingId = false;
  possitionCheck = false;

  listDeTai: Paginate<DeTai> = new Paginate<DeTai>();
  listDeTaiTemp: DeTai[] = [];
  isLoading = false;
  searchValueTextChanged = new Subject<string>();
  searchValueMemberTextChanged = new Subject<string>();
  searchValueLinhVuc = new Subject<string>();
  emailNhanVien = '';
  selectedValue = '';
  listNhanVienSearch: NhanVienEd[] = [];
  listNhanVienSelect: NhanVienEd[] = [];

  listLinhVuc: Paginate<LinhVucNghienCuu> = new Paginate();
  listHoiDongKiemDuyet: Paginate<HoiDongDuyetThuyetMinhGet> = new Paginate<HoiDongDuyetThuyetMinhGet>();
  searchValueNhanVien: Subject<string> = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    // private validatorSvc: ValidatorService,
    private alert: ToastrService,
    private deTaiSvc: DeTaiAdminService,
    private nhanVienSvc: NhanVienService,
    private hoiDongKiemDuyetSvc: HoiDongKiemDuyetService,
    private linhVucSvc: LinhVucNghienCuuService
  ) { }

  ngOnInit() {
    this.listChucVuHoiDongTemp = this.listChucVuHoiDong.map(x=>({
      id: x.id,
      title: x.title,
      status: false
    }));
    this.getLinVuc();
    this.getDetaiChuaCohoiDong();
    this.createForm();
    this.searchValueTextChanged.pipe(debounceTime(300))
      .subscribe(searchValue => {
        // Searching
        this.getDetaiChuaCohoiDong(searchValue);
        // Load done
        this.isLoading = false;
      });
    this.searchValueNhanVien.pipe(debounceTime(300))
      .subscribe(searchValue => {
        // Searching
        this.searchNhanVien(searchValue);
        // Load done
        this.isLoading = false;
      });
  }

  focusSelectNhanVien() {
    this.searchNhanVien('');
  }

  checkBienEdit() {
    return this.listThanhVienTemp.some(x=> x.isEdit );
  }

  searchNhanVien(searchValue?: string) {
    this.nhanVienSvc.searchNhanVien(searchValue)
      .subscribe(res => {
        this.listNhanVienSearch = res;
      });
  }

  getLinVuc() {
    this.linhVucSvc.getAllActive()
      .subscribe(res => {
        this.listLinhVuc.data = res;
      });
  }

  getAllHoiDongKiemDuyet(searchValue?: string) {
    this.hoiDongKiemDuyetSvc.getHoiDongKiemDuyetPaging(
      this.listHoiDongKiemDuyet.currentPage - 1,
      this.listHoiDongKiemDuyet.limit,
      searchValue)
      .subscribe(res => {
        this.listHoiDongKiemDuyet.data = res.content;
        this.listHoiDongKiemDuyet.currentPage = res.pageable.pageNumber + 1;
        this.listHoiDongKiemDuyet.limit = res.pageable.pageSize;
        this.listHoiDongKiemDuyet.totalPage = res.totalPages;
        this.listHoiDongKiemDuyet.totalItem = res.totalElements;
      });
  }

  getDetaiById(deTaiIds: string[]) {
    this.deTaiSvc.getDeTaiByListIdPaging(deTaiIds, 0, 30)
      .subscribe(res => {
        this.listDeTai.data = this.listDeTai.data.concat(res.content);
      });
  }

  getNhanVienByEmail(email: string) {
    // this.listNhanVienSelect = [];
    this.nhanVienSvc.getByEmail(email)
      .subscribe(res => {
        if (this.listThanhVienTemp.length >= 3) {
          this.alert.warning(this.languageData[this.langCode].CENSOR_COUNCILS_IS_FULL);
        } else {
          // this.listNhanVienSelect.push(res);
          this.addNhanVienToList(res);
        }
      }, () => { this.alert.warning(this.languageData[this.langCode].EMPLOYEE_IS_AVAILABLE); });
  }

  addNhanVienToList(nhanVien: NhanVienEd) {
    this.listThanhVienTemp = this.listThanhVienTemp.map(x=>({
      chucVu: x.chucVu,
      chucVuId: x.chucVuId,
      dienThoaiDiDong: x.dienThoaiDiDong,
      donVi: x.donVi,
      donViId: x.donViId,
      email: x.email,
      gioiTinh: x.gioiTinh,
      hoTen: x.hoTen,
      maDonVi: x.maDonVi,
      ngaySinh: x.ngaySinh,
      soHieuCongChuc: x.soHieuCongChuc,
      hocHam: x.hocHam,
      hocVi: x.hocVi,
      taiKhoanNganHang: x.taiKhoanNganHang,
      vaiTro: x.vaiTro,
      isEdit: false
    }));
    if (!this.listThanhVien.some(x => x.email === nhanVien.email)) {
      this.listThanhVien.push(nhanVien);
      this.listThanhVienTemp = this.listThanhVien;
    } else {
      this.alert.error(this.languageData[this.langCode].EMPLOYEE_IS_AVAILABLE);
    }
  }

  getDetaiChuaCohoiDong(searchValue?: string) {
    this.deTaiSvc.getAllDeTaiChuaCoHoiDongPaging(
      this.listDeTai.currentPage - 1,
      this.listDeTai.limit,
      searchValue)
      .subscribe(resDeTai => {
        this.listDeTai.currentPage = resDeTai.pageable.pageNumber + 1;
        this.listDeTai.limit = resDeTai.pageable.pageSize;
        this.listDeTai.totalPage = resDeTai.totalPages;
        this.listDeTai.totalItem = resDeTai.totalElements;
        this.listDeTai.data = resDeTai.content;
      });
  }

  pageChange(page: Paginate<DeTai>): void {
    this.listDeTai = page;
    this.getDetaiChuaCohoiDong();
  }

  createForm() {
    this.form = this.fb.group({
      tenHoiDong: ['', [Validators.required]],
      soQuyetDinh: ['', [Validators.required]],
      deTaiIds: [[], [Validators.required]],
      thanhVienHoiDongs: [null, [Validators.required]],
      diaDiem: ['', [Validators.required]],
      linhVucId: ['', [Validators.required]],
      ngayHop: ['', [Validators.required]],
      ngayQuyetDinh: ['', [Validators.required]]
    });
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.getDetaiById(this.modalData.data.deTaiIds);
      this.patchValue();
    }
  }

  patchValue() {
    this.form.patchValue({
      tenHoiDong: this.modalData.data.tenHoiDong,
      soQuyetDinh: this.modalData.data.soQuyetDinh,
      deTaiIds: this.modalData.data.deTaiIds,
      thanhVienHoiDongs: this.modalData.data.thanhVienHoiDongs,
      diaDiem: this.modalData.data.diaDiem,
      linhVucId: this.modalData.data.linhVuc.id,
      ngayHop: this.modalData.data.ngayHop,
      ngayQuyetDinh: this.modalData.data.ngayQuyetDinh
    });
    this.listThanhVien = this.modalData.data.thanhVienHoiDongs.map(x => ({
      chucVu: x.thanhVien.chucVu,
      chucVuId: x.thanhVien.chucVuId,
      dienThoaiDiDong: x.thanhVien.dienThoaiDiDong,
      donVi: x.thanhVien.donVi,
      donViId: x.thanhVien.donViId,
      email: x.thanhVien.email,
      gioiTinh: x.thanhVien.gioiTinh,
      hoTen: x.thanhVien.hoTen,
      maDonVi: x.thanhVien.maDonVi,
      ngaySinh: x.thanhVien.ngaySinh,
      soHieuCongChuc: x.thanhVien.soHieuCongChuc,
      hocHam: x.thanhVien.hocHam,
      hocVi: x.thanhVien.hocVi,
      taiKhoanNganHang: x.thanhVien.taiKhoanNganHang,
      vaiTro: x.vaiTro,
      isEdit: false
    }));
    this.mappingPatchValue();
  }

  mappingPatchValue() {
    this.listThanhVienTemp = this.listThanhVien;
  }

  checkChuCVuHoiDong(vaiTro: string) {
    this.listChucVuHoiDongTemp.splice(this.listChucVuHoiDongTemp.findIndex(x=> x.id === vaiTro), 1);
  }

  onCancel() {
    this.returnData.emit(false);
  }

  onSubmit() {
    this.listThanhVien = this.listThanhVienTemp;
    if (this.listThanhVienTemp.some(x => x.vaiTro === '' || x.vaiTro === null)) {
      this.alert.warning(this.languageData[this.langCode].PLEASE_CHOOSE_POSITION_IN_COUNCIL);
    } else {
      this.form.get('thanhVienHoiDongs').setValue(this.listThanhVien.map(x => ({
        email: x.email,
        vaiTro: x.vaiTro
      })));
      if (!this.listThanhVienTemp.some(x => x.isEdit)) {
        if (this.form.valid) {
          if (this.modalData.action === SystemConstant.ACTION.ADD) {
            this.hoiDongKiemDuyetSvc.taoHoiDongXetDuyet(this.form.value)
              .subscribe(() => {
                this.alert.success(MessageConstant[this.langCode].MSG_CREATED_DONE);
                this.returnData.emit(true);
              });
          } else {
            this.hoiDongKiemDuyetSvc.updateHoiDongXetDuyet(this.modalData.data.id, this.form.value)
              .subscribe(() => {
                this.alert.success(MessageConstant[this.langCode].MSG_UPDATED_DONE);
                this.returnData.emit(true);
              });
          }
        } else {
          this.alert.warning(MessageConstant[this.langCode].MSG_FIELD_EMPTY);
        }
      } else {
        this.alert.error('Vui lòng tắt chức năng edit trong danh sách thành viên');
      }
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

  startEdit(email: string): void {
    this.listThanhVienTemp.map(x=>x.isEdit = false);
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
    this.listChucVuHoiDongTemp[this.listChucVuHoiDongTemp.findIndex(x=> x.id === vaiTro)].status = true;
  }

  deleteCell(email: string, vaiTro: string): void {
    this.listThanhVienTemp.splice(this.listThanhVienTemp.findIndex(x => x.email === email), 1);
    this.listThanhVien = this.listThanhVienTemp;
    // this.listChucVuHoiDongTemp.push(this.listChucVuHoiDong[this.listChucVuHoiDong.findIndex(x => x.id = vaitro)]);
    this.listChucVuHoiDongTemp[this.listChucVuHoiDongTemp.findIndex(x=> x.id === vaiTro)].status = false;
  }

  getNameOfChucVu(id: string): string {
    const chucVu = this.listChucVuHoiDong.find(x => x.id === id);
    return chucVu ? chucVu.title : '';
  }

}
