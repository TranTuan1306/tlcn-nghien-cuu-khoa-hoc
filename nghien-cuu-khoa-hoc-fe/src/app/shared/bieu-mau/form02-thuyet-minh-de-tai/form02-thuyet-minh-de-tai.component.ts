import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { NhanVienExt } from 'src/app/core/models/common/hrm-nhan-vien.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ThoiGianQuyTrinh } from 'src/app/core/models/management/cau-hinh/thoi-gian-quy-trinh.model';
import { ChiTietKhoanChi, ChiTietKinhPhiDuKien, KinhPhiDuKien } from 'src/app/core/models/management/danh-muc/kinh-phi.model';
import { LinhVucNghienCuu } from 'src/app/core/models/management/danh-muc/linh-vuc-nghien-cuu.model';
import { LoaiHinhNghienCuu } from 'src/app/core/models/management/danh-muc/loai-hinh-nghien-cuu.model';
import { ChiTietSanPham, SanPham } from 'src/app/core/models/management/danh-muc/san-pham.model';
import { DeTai, DonViPhoiHop, ThanhVienCungThamGia, TienDoThucHien } from 'src/app/core/models/management/de-tai/de-tai.model';
import { UtilitiesService } from 'src/app/core/services/common/utilities.service';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { ThoiGianQuyTrinhService } from 'src/app/core/services/management/cau-hinh/thoi-gian-quy-trinh.service';
import { LinhVucNghienCuuService } from 'src/app/core/services/management/danh-muc/linh-vuc-nghien-cuu.service';
import { LoaiHinhNghienCuuService } from 'src/app/core/services/management/danh-muc/loai-hinh-nghien-cuu.service';
import { DeTaiService } from 'src/app/core/services/user/de-tai.service';
import Editor from 'src/assets/libs/ckeditor5/build/ckeditor';
import { Paginate } from '../../widget/paginate/paginate.model';

@Component({
  selector: 'app-form02-thuyet-minh-de-tai',
  templateUrl: './form02-thuyet-minh-de-tai.component.html',
  styleUrls: ['./form02-thuyet-minh-de-tai.component.scss']
})
export class Form02ThuyetMinhDeTaiComponent implements OnInit {

  @Input() modalData: ModalData<DeTai>;
  @Input() dotDangKyId: string;
  @Input() deTaiId: string;
  @Output() modalReturn: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  editor = Editor;
  cfgEditor = SystemConstant.configEditor5;

  // modal
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modalDataMini: ModalData<any> = new ModalData();
  modalDefaultWidth = 400;
  modalRef: NzModalRef;

  form: FormGroup;
  isTouchMiniForm = false;

  listLoaiSanPham = SystemConstant.LOAI_SAN_PHAM_TITLE[this.langCode];

  chuNhiemDeTai: NhanVienExt = new NhanVienExt(); // Load từ HRM, người đăng ký ở step 1

  listThanhVienThamGiaNghienCuu: ThanhVienCungThamGia[] = [];
  listDonViPhoiHopChinh: DonViPhoiHop[] = [];
  listTienDoThucHien: TienDoThucHien[] = [];
  listSanPhamThuyetMinh: ChiTietSanPham[] = [];
  listChiTietKinhPhiDuKien: ChiTietKinhPhiDuKien[] = [];
  overviewKinhPhiDuKien: KinhPhiDuKien = new KinhPhiDuKien();

  listLinhVuc: LinhVucNghienCuu[] = [];
  listLoaiHinhNghienCuu: LoaiHinhNghienCuu[] = [];
  listThoiGianQuyTrinh: ThoiGianQuyTrinh[] = [];

  noiDungDeTai: DeTai = null;



  // table
  loading = true;
  listDeTai: Paginate<DeTai> = new Paginate<DeTai>();
  listDeTaiByChuNhiem: Paginate<DeTai> = new Paginate<DeTai>();
  searchValue = '';


  constructor(
    private utilsSvc: UtilitiesService,
    private fbd: FormBuilder,
    private nzModalSvc: NzModalService,
    private validatorSvc: ValidatorService,
    private deTaiSvc: DeTaiService,
    private alert: ToastrService,
    private linhVucNghienCuuSvc: LinhVucNghienCuuService,
    private loaiHinhNghienCuuSvc: LoaiHinhNghienCuuService,
    private thoiGianQuyTrinhSvc: ThoiGianQuyTrinhService,
  ) { }

  ngOnInit() {
    this.createForm();
 
    if (this.dotDangKyId !== null && this.deTaiId !== null) {
      // Get data de tai from DB by ID (modalData.data)
      this.getDeTaiByChuNhiem();
    }
    this.chuNhiemDeTai.hoTen = 'Load từ HRM, người đăng ký ở step 1, prefill';

    // Load All chi tiet kinh phi du kien
    this.listChiTietKinhPhiDuKien = [
      {
        loaiKinhPhi: {
          id: '1',
          tenLoaiKinhPhi: 'Phụ lục 1',
          tenLoaiKinhPhiEn: 'Phu luc 1 en',
          fieldNames: ['duKienKetQua', 'thoiGian', 'thanhTien']
        },
        thuTu: 1,
        tongKinhPhi: 0,
        nganSachNhaNuoc: 0,
        nguonKinhPhiKhac: 0,
        ghiChu: '',
        chiTietKhoanChis: [new ChiTietKhoanChi()]
      },
      {
        loaiKinhPhi: {
          id: '2',
          tenLoaiKinhPhi: 'Phụ lục 2',
          tenLoaiKinhPhiEn: 'Phu luc 2 en',
          fieldNames: ['noiDungChi', 'donViTinh', 'soLuong', 'donGia', 'thanhTien']
        },
        thuTu: 2,
        tongKinhPhi: 0,
        nganSachNhaNuoc: 0,
        nguonKinhPhiKhac: 0,
        ghiChu: '',
        chiTietKhoanChis: [new ChiTietKhoanChi()]
      }
    ];

    this.getAllLinhVuc();
    this.getAllLoaiHinhNghienCuu();
    this.getAllThoiGianQuyTrinh();
    // this.getDeTaiByChuNhiem();
  }

  createForm() {
    this.form = this.fbd.group({
      maSo: [null, Validators.required],
      maSoTheoLinhVuc: [null, Validators.required],
      maSoTheoDeTai: [null, Validators.required],
      linhVucNghienCuu: [null, Validators.required],
      loaiHinhNghienCuu: [null, Validators.required],
      thoiGianThucHien: [null, Validators.required],
      coQuanChuTriDeTai: [this.languageData[this.langCode].DEFAULT_HOST],
      thanhVienThamGiaNghienCuu: [null],
      donViPhoiHopChinh: [null],
      tongQuanTinhHinhNghienCuuNgoaiNuoc: [null, Validators.required],
      tongQuanTinhHinhNghienCuuTrongNuoc: [null, Validators.required],
      danhMucCongTrinhDaCongBo: [null, Validators.required],
      tinhCapThiet: [null, Validators.required],
      mucTieu: [null, Validators.required],
      doiTuongNghienCuu: [null, Validators.required],
      phamViNghienCuu: [null, Validators.required],
      cachTiepCan: [null, Validators.required],
      phuongPhapNghienCuu: [null, Validators.required],
      noiDungNghienCuu: [null, Validators.required],
      tienDoThucHien: [null],
      // sanPhamKhoaHoc: [null, Validators.required],
      // sanPhamDaoTao: [null, Validators.required],
      // sanPhamUngDung: [null, Validators.required],
      // sanPhamKhac: [null, Validators.required],
      yeuCauKhoaHoc: [null],
      hieuQua: [null, Validators.required],
      phuongThucChuyenGiao: [null, Validators.required],
      tongKinhPhi: [null, Validators.required],
      nganSachNhaNuoc: [null, Validators.required],
      nguonKinhPhiKhac: [null, Validators.required],
      duTruCacMucChi: [null],
      chiTietKinhPhiDuKiens: [[]]
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sumKinhPhiByName(data: any[], fieldname: string, refObjToSave?: unknown, refFieldName?: string): number {
    // params: data: ChiTietKinhPhiDuKien[] => sum overviewKinhPhiDuKien
    // params: data: ChiTietKhoanChi[] => sum listChiTietKinhPhiDuKien.tongKinhPhi, nganSachNhaNuoc, nguonKinhPhiKhac
    const sumAll = data.reduce((sum, obj) => sum += obj ? parseInt(obj[fieldname], 10) || 0 : 0, 0);
    if (refObjToSave && refFieldName) {
      refObjToSave[refFieldName] = sumAll;
    }
    return sumAll;
  }

  onCancel() {
    console.log('modalReturn send false');
    this.modalReturn.emit(false);
  }

  // onSubmit() {
  //   console.log(this.listChiTietKinhPhiDuKien);
  //   this.isTouchMiniForm = true;
  //   if (this.form.valid) {
  //     console.log('modalReturn send true');
  //     this.modalReturn.emit(true);
  //   } else {
  //     this.validatorSvc.validateAllFormFields(this.form);
  //   }
  // }

  onSubmit() {
    this.form.get('chiTietKinhPhiDuKiens').setValue(this.listChiTietKinhPhiDuKien);
    console.log(this.form);
    if (this.form.valid) {
      if (this.noiDungDeTai !== null) {
        this.deTaiSvc.updateDeTai(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.modalReturn.emit(false);
            this.alert.success(this.languageData[this.langCode].MSG_UPDATED_DONE);
          });
      } else {
        this.deTaiSvc.createDeTai(this.form.value)
          .subscribe(() => {
            this.modalReturn.emit(false);
            this.alert.success(this.languageData[this.langCode].MSG_CREATED_DONE);
          });
      }
    } else {
      this.validatorSvc.validateAllFormFields(this.form);
    }
  }

  readNumber(num: number, endingStr: string) {
    return this.langCode === 'vi' ? this.utilsSvc.readNumberAsText(num, endingStr) : '';
  }

  openModal(template: TemplateRef<unknown>, modalWidth: number, customTitle?: string): void {
    this.modalRef = this.nzModalSvc.create({
      nzWidth: modalWidth,
      nzTitle: customTitle ? customTitle :
        ((this.modalData.action === SystemConstant.ACTION.ADD ? this.languageData[this.langCode].CREATING
          : this.languageData[this.langCode].EDITING)),
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
      // nzOnOk: () => this.closeModal(),
      // nzOnCancel: () => this.closeModal()
    });
  }

  isFieldValid(field: string): boolean {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openModalAction(template: TemplateRef<unknown>, modalWidth: number, title: string, action: string, data?: any): void {
    this.modalDataMini.action = action;
    this.modalDataMini.data = data;
    this.openModal(template, modalWidth,
      (action === SystemConstant.ACTION.ADD ? this.languageData[this.langCode].ADD_NEW :
        action === SystemConstant.ACTION.EDIT ? this.languageData[this.langCode].EDIT :
          this.languageData[this.langCode].VIEW + ' ') + title);
  }

  handleReturnedThanhVienThamGia(thanhVien: ThanhVienCungThamGia): void {
    if (thanhVien) {
      if (this.modalDataMini.action === 'add') {
        this.listThanhVienThamGiaNghienCuu = [...this.listThanhVienThamGiaNghienCuu, thanhVien];
      } else if (this.modalDataMini.action === 'edit') {
        const indexItem = this.listThanhVienThamGiaNghienCuu.findIndex(x => x.id === thanhVien.id);
        if (indexItem >= 0) {
          this.listThanhVienThamGiaNghienCuu[indexItem] = thanhVien;
          this.listThanhVienThamGiaNghienCuu = [...this.listThanhVienThamGiaNghienCuu];
        }
      }
    }
    this.modalRef.destroy();
  }

  deleteThanhVienThamGia(indexThanhVien: number): void {
    this.listThanhVienThamGiaNghienCuu.splice(indexThanhVien, 1);
    this.listThanhVienThamGiaNghienCuu = [...this.listThanhVienThamGiaNghienCuu];
  }

  handleReturnedDonViPhoiHop(donVi: DonViPhoiHop): void {
    if (donVi) {
      if (this.modalDataMini.action === 'add') {
        this.listDonViPhoiHopChinh = [...this.listDonViPhoiHopChinh, donVi];
      } else if (this.modalDataMini.action === 'edit') {
        const indexItem = this.listDonViPhoiHopChinh.findIndex(x => x.id === donVi.id);
        if (indexItem >= 0) {
          this.listDonViPhoiHopChinh[indexItem] = donVi;
          this.listDonViPhoiHopChinh = [...this.listDonViPhoiHopChinh];
        }
      }
    }
    this.modalRef.destroy();
  }

  deleteDonViPhoiHop(indexDonVi: number): void {
    this.listDonViPhoiHopChinh.splice(indexDonVi, 1);
    this.listDonViPhoiHopChinh = [...this.listDonViPhoiHopChinh];
  }

  handleReturnedTienDoThucHien(tienDo: TienDoThucHien): void {
    if (tienDo) {
      if (this.modalDataMini.action === 'add') {
        this.listTienDoThucHien = [...this.listTienDoThucHien, tienDo];
      } else if (this.modalDataMini.action === 'edit') {
        const indexItem = this.listTienDoThucHien.findIndex(x => x.id === tienDo.id);
        if (indexItem >= 0) {
          this.listTienDoThucHien[indexItem] = tienDo;
          this.listTienDoThucHien = [...this.listTienDoThucHien];
        }
      }
    }
    this.modalRef.destroy();
  }

  deleteTienDoThucHien(indexTienDo: number): void {
    this.listTienDoThucHien.splice(indexTienDo, 1);
    this.listTienDoThucHien = [...this.listTienDoThucHien];
  }

  filterSanPhamTheoLoai(idLoai: string): ChiTietSanPham[] {
    if (idLoai === SystemConstant.LOAI_SAN_PHAM.KHAC) {
      return this.listSanPhamThuyetMinh.filter(x => typeof x.sanPham === 'string');
    } else {
      return this.listSanPhamThuyetMinh.filter(x => typeof x.sanPham === 'object' && x.sanPham.loaiSanPham === idLoai);
    }
  }

  isSanPhamKhac(sanPham: SanPham | string) {
    return typeof sanPham === 'object' ? false : true;
  }

  handleReturnedSpThuyetMinh(sanPham: ChiTietSanPham): void {
    if (sanPham) {
      if (this.modalDataMini.action === 'add') {
        this.listSanPhamThuyetMinh = [...this.listSanPhamThuyetMinh, sanPham];
      } else if (this.modalDataMini.action === 'edit') {
        const indexItem = this.listSanPhamThuyetMinh.findIndex(x => x.id === sanPham.id);
        if (indexItem >= 0) {
          this.listSanPhamThuyetMinh[indexItem] = sanPham;
          this.listSanPhamThuyetMinh = [...this.listSanPhamThuyetMinh];
        }
      }
    }
    this.modalRef.destroy();
  }

  deleteSpThuyetMinh(idSanPham: string): void {
    const indexItem = this.listSanPhamThuyetMinh.findIndex(x => x.id === idSanPham);
    if (indexItem >= 0) {
      this.listSanPhamThuyetMinh.splice(indexItem, 1);
      this.listSanPhamThuyetMinh = [...this.listSanPhamThuyetMinh];
    }
  }

  handleReturnedPaymentPhuLuc(chiTietKinhPhi: ChiTietKinhPhiDuKien): void {
    // Save data & Re-calculate total expense (re-calc in template already)
    if (chiTietKinhPhi) {
      const index = this.listChiTietKinhPhiDuKien.findIndex(x => x.loaiKinhPhi.id === chiTietKinhPhi.loaiKinhPhi.id);

      this.listChiTietKinhPhiDuKien[index].chiTietKhoanChis = chiTietKinhPhi.chiTietKhoanChis;

      this.form.get('nganSachNhaNuoc').setValue(this.listChiTietKinhPhiDuKien[index].nganSachNhaNuoc =
      this.sumKinhPhiByName(this.listChiTietKinhPhiDuKien[index].chiTietKhoanChis, 'nganSachNhaNuoc'));

      this.form.get('nguonKinhPhiKhac').setValue(this.listChiTietKinhPhiDuKien[index].nguonKinhPhiKhac =
      this.sumKinhPhiByName(this.listChiTietKinhPhiDuKien[index].chiTietKhoanChis, 'nguonKinhPhiKhac'));

      this.form.get('tongKinhPhi').setValue(this.listChiTietKinhPhiDuKien[index].tongKinhPhi =
      this.listChiTietKinhPhiDuKien[index].nganSachNhaNuoc + this.listChiTietKinhPhiDuKien[index].nguonKinhPhiKhac);
    }
    this.modalRef.destroy();
  }

  getAllLinhVuc(): void {
    this.linhVucNghienCuuSvc.findAll()
      .subscribe(res => this.listLinhVuc = res);
  }

  getAllLoaiHinhNghienCuu(): void {
    this.loaiHinhNghienCuuSvc.findAll()
      .subscribe(res => this.listLoaiHinhNghienCuu = res);
  }

  getDeTaiByChuNhiem(dotDangKyId?: string): void {
    console.log( "tessttttt",dotDangKyId)
    this.loading = true;
    console.log("aa", this.listDeTaiByChuNhiem)
    this.deTaiSvc.getDeTaiByChuNhiem(
      dotDangKyId,
      this.listDeTaiByChuNhiem.currentPage - 1,
      this.listDeTaiByChuNhiem.limit,     
      this.searchValue,
      )
      .subscribe(res => {
        this.listDeTaiByChuNhiem.data = res.content;
        this.listDeTaiByChuNhiem.totalItem = res.totalElements;
        this.listDeTaiByChuNhiem.totalPage = res.totalPages;
        this.listDeTaiByChuNhiem.limit = res.pageable.pageSize;
        this.loading = false;
      },
      () => {
        this.listDeTaiByChuNhiem.data = [];
        this.loading = false;
      });
  }

  getAllThoiGianQuyTrinh(): void {
    this.thoiGianQuyTrinhSvc.getAllThoiGianQuyTrinh()
      .subscribe(res => this.listThoiGianQuyTrinh = res);
  }


}
