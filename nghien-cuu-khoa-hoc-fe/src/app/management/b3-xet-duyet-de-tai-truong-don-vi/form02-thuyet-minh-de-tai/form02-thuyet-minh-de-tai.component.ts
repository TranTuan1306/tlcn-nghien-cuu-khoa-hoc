import { DeTaiAdminService } from './../../../core/services/management/de-tai/de-tai-admin.service';
import { MessageConstant } from './../../../core/constants/message.constant';
import { DonViService } from './../../../core/services/management/don-vi.service';
import { DonVi } from './../../../core/models/management/danh-muc/don-vi.model';
import { NhanVienService } from './../../../core/services/user/nhan-vien.service';
import { CauHinhBieuMau } from './../../../core/models/management/cau-hinh/cau-hinh-bieu-mau.model';
import { CauHinhBieuMauService } from './../../../core/services/management/cau-hinh/cau-hinh-bieu-mau.service';
import { LoaiKinhPhi } from './../../../core/models/management/danh-muc/kinh-phi.model';
import { LoaiKinhPhiService } from 'src/app/core/services/management/danh-muc/loai-kinh-phi.service';
import { DeTaiDto } from './../../../core/models/management/de-tai/de-tai-dto.model';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
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
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';
import Editor from 'src/assets/libs/ckeditor5/build/ckeditor';
import { NhanVienEd } from 'src/app/core/models/management/de-tai/nhan-vien-ed.model';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-form02-thuyet-minh-de-tai-management',
  templateUrl: './form02-thuyet-minh-de-tai.component.html',
  styleUrls: ['./form02-thuyet-minh-de-tai.component.scss']
})
export class Form02ThuyetMinhDeTaiManagementComponent implements OnInit {

  @Input() modalData: ModalData<string> = new ModalData<string>();
  @Input() dotDangKyId: string;
  @Input() deTaiId: string;
  @Output() modalReturn: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  currentUser = JSON.parse(localStorage.getItem('jwt_user_google'));
  ///////////////////////////////

  editor = Editor;
  cfgEditor = SystemConstant.configEditor5;

  // modal
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modalDataMini: ModalData<any> = new ModalData();
  modalDefaultWidth = 400;
  modalRef: NzModalRef;

  deTaiDto = new DeTaiDto();
  form: FormGroup;
  isTouchMiniForm = false;

  listLoaiSanPham = SystemConstant.LOAI_SAN_PHAM_TITLE[this.langCode];

  chuNhiemDeTai: NhanVienExt = new NhanVienExt(); // Load từ HRM, người đăng ký ở step 1

  listThanhVienThamGiaNghienCuu: ThanhVienCungThamGia[] = [];
  listDonViPhoiHopChinh: DonViPhoiHop[] = [];
  listTienDoThucHien: TienDoThucHien[] = [];
  listSanPhamThuyetMinh: ChiTietSanPham[] = [];
  listChiTietKinhPhiDuKien: ChiTietKinhPhiDuKien[] = [];
  listLoaiKinhPhi: LoaiKinhPhi[] = [];
  chiTietKinhPhiDuKien: ChiTietKinhPhiDuKien = new ChiTietKinhPhiDuKien();
  overviewKinhPhiDuKien: KinhPhiDuKien = new KinhPhiDuKien();

  listLinhVuc: LinhVucNghienCuu[] = [];
  listLoaiHinhNghienCuu: LoaiHinhNghienCuu[] = [];
  listThoiGianQuyTrinh: ThoiGianQuyTrinh[] = [];

  noiDungDeTai: DeTai = null;
  listDonVi: DonVi[];



  // table
  loading = true;
  listDeTai: Paginate<DeTai> = new Paginate<DeTai>();
  listDeTaiByChuNhiem: Paginate<DeTai> = new Paginate<DeTai>();
  searchValue = '';
  //check hiển thị form
  checkShowForm = false;

  //Check hiển thị button duyệt
  checkShowBtnDuyet = false;

  cauHinhBieuMau: CauHinhBieuMau;

  nhanVien: NhanVienEd;

  constructor(
    private utilsSvc: UtilitiesService,
    private fbd: FormBuilder,
    private nzModalSvc: NzModalService,
    private validatorSvc: ValidatorService,
    private deTaiSvc: DeTaiAdminService,
    private alert: ToastrService,
    private linhVucNghienCuuSvc: LinhVucNghienCuuService,
    private loaiHinhNghienCuuSvc: LoaiHinhNghienCuuService,
    private thoiGianQuyTrinhSvc: ThoiGianQuyTrinhService,
    private activatedRouterSvc: ActivatedRoute,
    private loaiKinhPhiSvc: LoaiKinhPhiService,
    private cauHinhBieumauSvc: CauHinhBieuMauService,
    private nhanVienSvc: NhanVienService,
    private donViSvc: DonViService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.createForm();
    if (this.dotDangKyId !== null && this.deTaiId !== null) {
      // Get data de tai from DB by ID (modalData.data)
      // this.getDeTaiByChuNhiem();
    }
    // this.getApiDeTaiById();
    this.getAllLinhVuc();
    this.getAllLoaiHinhNghienCuu();
    this.getCauHinhBieuMau();
    this.getNhanVien();
    this.getAllDonVi();
  }

  getCauHinhBieuMau() {
    this.cauHinhBieumauSvc.getCauHinhBieuMau()
      .subscribe(res => {
        this.cauHinhBieuMau = res;
      });
  }

  getNhanVien() {
    this.nhanVienSvc.getCurrent()
      .subscribe(res => {
        this.nhanVien = {
          chucVu: res.chucVu,
          chucVuId: res.chucVuId,
          dienThoaiDiDong: res.dienThoaiDiDong,
          donVi: res.donVi,
          donViId: res.donVi,
          email: res.email,
          gioiTinh: res.gioiTinh,
          hoTen: res.hoTen,
          maDonVi: res.maDonVi,
          ngaySinh: res.ngaySinh.replace(/T.*/, '').split('-').reverse().join('-'),
          soHieuCongChuc: res.soHieuCongChuc,
          hocHam: res.hocHam,
          hocVi: res.hocVi,
          taiKhoanNganHang: res.taiKhoanNganHang
        };
      });
  }

  getAllDonVi() {
    this.donViSvc.getAllDonVi()
      .subscribe(res => {
        this.listDonVi = res;
      });
  }
  getLoaiKinhPhiVaMappingVaoChiTiet() {
    this.loaiKinhPhiSvc.getActive()
      .subscribe(res => {
        this.listChiTietKinhPhiDuKien = [];
        this.listLoaiKinhPhi = res;
        this.listLoaiKinhPhi.map((x) => {
          this.listChiTietKinhPhiDuKien.push({
            loaiKinhPhi:
            {
              id: x.id,
              fieldNames: x.fieldNames,
              tenLoaiKinhPhi: x.tenLoaiKinhPhi,
              tenLoaiKinhPhiEn: x.tenLoaiKinhPhiEn
            },
            thuTu: this.chiTietKinhPhiDuKien.thuTu,
            nganSachNhaNuoc: this.chiTietKinhPhiDuKien.nganSachNhaNuoc,
            nguonKinhPhiKhac: this.chiTietKinhPhiDuKien.nguonKinhPhiKhac,
            tongKinhPhi: this.chiTietKinhPhiDuKien.tongKinhPhi,
            ghiChu: this.chiTietKinhPhiDuKien.ghiChu,
            chiTietKhoanChis: [new ChiTietKhoanChi()]
          });
        });
      });
  }

  getApiDeTaiById() {
    this.deTaiSvc.getDeTaiById(this.modalData.data)
      .subscribe(res => {
        this.noiDungDeTai = res;
        if (res.donViId) {
          this.patchValue();
        } else {
          this.getLoaiKinhPhiVaMappingVaoChiTiet();
        }
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  createForm() {
    this.spinner.show();
    setTimeout(() => {
      this.form = this.fbd.group({
        donViId: ['', Validators.required],
        maSo: [null, Validators.required],
        maSoTheoLinhVucNghienCuu: ['', Validators.required],
        maSoTheoMucTieuNghienCuu: ['', Validators.required],
        linhVucNghienCuuId: ['', Validators.required],
        loaiHinhNghienCuuId: ['', Validators.required],
        thoiGianNghienCuuDuKien: ['', Validators.required],
        coQuanChuTriDeTai: ['', Validators.required],
        thanhVienThamGiaNghienCuu: ['', Validators.required],
        donViPhoiHops: ['', Validators.required],
        tinhHinhTrongNuoc: [{ value: '', disabled: true }, Validators.required],
        tinhHinhNgoaiNuoc: [{ value: '', disabled: true }, Validators.required],
        thanhTuu: [{ value: '', disabled: true }, Validators.required],
        tinhCapThiet: [{ value: '', disabled: true }, Validators.required],
        mucTieu: [{ value: '', disabled: true }, Validators.required], //get từ bên đề xuất de tai ra
        doiTuongNghienCuu: [{ value: '', disabled: true }, Validators.required],
        phamViNghienCuu: [{ value: '', disabled: true }, Validators.required],
        cachTiepCan: [{ value: '', disabled: true }, Validators.required],
        phuongPhapNghienCuu: [{ value: '', disabled: true }, Validators.required],
        noiDungNghienCuu: [{ value: '', disabled: true }, Validators.required],
        hieuQua: [{ value: '', disabled: true }, Validators.required],
        chuyenGiaoVaUngDung: [{ value: '', disabled: true }, Validators.required],
        tongKinhPhi: ['', Validators.required],
        nganSachNhaNuoc: ['', Validators.required],
        nguonKinhPhiKhac: ['', Validators.required],
        chiTietKinhPhiDuKiens: [[]]
      });
      this.getApiDeTaiById();
      this.checkShowForm = true;
      this.spinner.hide();
    }, 100);
  }

  checkShowBtnDuyetKhoa() {
    if (this.form.get('donViId').value === '') {
      this.checkShowBtnDuyet = false;
    } else {
      this.checkShowBtnDuyet = true;
    }
  }

  patchValue() {
    this.form.patchValue({
      maSo: this.noiDungDeTai?.maSo,
      maSoTheoLinhVucNghienCuu: this.noiDungDeTai?.maSoTheoLinhVucNghienCuu,
      maSoTheoMucTieuNghienCuu: this.noiDungDeTai?.maSoTheoMucTieuNghienCuu,
      linhVucNghienCuuId: this.noiDungDeTai?.linhVucNghienCuu?.id,
      loaiHinhNghienCuuId: this.noiDungDeTai?.loaiHinhNghienCuu?.id,
      thoiGianNghienCuuDuKien: this.noiDungDeTai?.thoiGianNghienCuuDuKien,
      coQuanChuTriDeTai: '',
      tinhHinhTrongNuoc: this.noiDungDeTai?.tongQuanTinhHinhNghienCuu?.tinhHinhTrongNuoc,
      tinhHinhNgoaiNuoc: this.noiDungDeTai?.tongQuanTinhHinhNghienCuu?.tinhHinhNgoaiNuoc,
      thanhTuu: this.noiDungDeTai?.tongQuanTinhHinhNghienCuu?.thanhTuu,
      tinhCapThiet: this.noiDungDeTai?.tinhCapThiet,
      mucTieu: this.noiDungDeTai?.mucTieu, //get từ bên đề xuất de tai ra
      doiTuongNghienCuu: this.noiDungDeTai?.doiTuongNghienCuu,
      phamViNghienCuu: this.noiDungDeTai?.phamViNghienCuu,
      cachTiepCan: this.noiDungDeTai?.cachTiepCan,
      phuongPhapNghienCuu: this.noiDungDeTai?.phuongPhapNghienCuu,
      noiDungNghienCuu: this.noiDungDeTai?.noiDungNghienCuu,
      hieuQua: this.noiDungDeTai?.hieuQua,
      chuyenGiaoVaUngDung: this.noiDungDeTai?.chuyenGiaoVaUngDung,
      donViId: this.noiDungDeTai?.donViId,
      tongKinhPhi: this.noiDungDeTai?.kinhPhiDuKien?.tongKinhPhi,
      nganSachNhaNuoc: this.noiDungDeTai?.kinhPhiDuKien?.nganSachNhaNuoc,
      nguonKinhPhiKhac: this.noiDungDeTai?.kinhPhiDuKien?.nguonKinhPhiKhac

    });

    this.listThanhVienThamGiaNghienCuu = this.noiDungDeTai.thanhVienCungThamGias.map(x => ({
      id: `${[Math.floor(Math.random() * 10000000)]}`, // Temp ID
      hoTen: x.hoTen,
      donViCongTac: x.donViCongTac,
      linhVucChuyenMon: x.linhVucChuyenMon,
      noiDungDuocGiaos: x.noiDungDuocGiaos,
    }));
    this.listDonViPhoiHopChinh = this.noiDungDeTai.donViPhoiHops.map(x => ({
      id: `${[Math.floor(Math.random() * 10000000)]}`, // Temp ID
      tenDonVi: x.tenDonVi,
      noiDungPhoiHop: x.noiDungPhoiHop,
      daiDienDonVi: x.daiDienDonVi
    }));
    this.listTienDoThucHien = this.noiDungDeTai.tienDoThucHiens.map(x => ({
      id: `${[Math.floor(Math.random() * 10000000)]}`, // Temp ID
      noiDung: x.noiDung,
      sanPham: x.sanPham,
      thoiGian: x.thoiGian, // số tháng
      nguoiThucHien: x.nguoiThucHien,
    }));
    this.listSanPhamThuyetMinh = [].concat.apply([], [this.noiDungDeTai.sanPhamDaoTaos, this.noiDungDeTai.sanPhamKhoaHocs,
      this.noiDungDeTai.sanPhamUngDungs, this.noiDungDeTai.sanPhamKhacs]).map(x => ({
      id: `${[Math.floor(Math.random() * 10000000)]}`, // Temp ID
      sanPham: x.sanPham,
      soLuong: x.soLuong,
      yeuCauKhoaHoc: x.yeuCauKhoaHocDatDuoc
    }));
    console.log(this.listSanPhamThuyetMinh);
    this.listChiTietKinhPhiDuKien = this.noiDungDeTai.chiTietKinhPhiDuKiens;
    this.checkShowBtnDuyetKhoa();
  }


  //Set data đưa vào api
  mappingDataToDeTaiDto() {
    this.deTaiDto.maSo = this.form.get('maSo').value;
    this.deTaiDto.maSoTheoLinhVucNghienCuu = this.form.get('maSoTheoLinhVucNghienCuu').value;
    this.deTaiDto.maSoTheoMucTieuNghienCuu = this.form.get('maSoTheoMucTieuNghienCuu').value;
    this.deTaiDto.linhVucNghienCuuId = this.form.get('linhVucNghienCuuId').value;
    this.deTaiDto.loaiHinhNghienCuuId = this.form.get('loaiHinhNghienCuuId').value;

    this.deTaiDto.thoiGianNghienCuuDuKien = this.form.get('thoiGianNghienCuuDuKien').value;

    this.deTaiDto.tongQuanTinhHinhNghienCuu = {
      thanhTuu: this.form.get('thanhTuu').value,
      tinhHinhNgoaiNuoc: this.form.get('tinhHinhNgoaiNuoc').value,
      tinhHinhTrongNuoc: this.form.get('tinhHinhTrongNuoc').value,
    };

    this.deTaiDto.thanhVienCungThamGias = this.listThanhVienThamGiaNghienCuu.map(x => ({
      id: `${[Math.floor(Math.random() * 10000000)]}`, // Temp ID
      hoTen: x.hoTen,
      donViCongTac: x.donViCongTac,
      linhVucId: x.linhVucChuyenMon.id,
      noiDungDuocGiaos: x.noiDungDuocGiaos,
    }));

    this.deTaiDto.donViPhoiHops = this.listDonViPhoiHopChinh;
    this.deTaiDto.tienDoThucHiens = this.listTienDoThucHien;
    this.deTaiDto.sanPhamDaoTaos = this.listSanPhamThuyetMinh.map((x) => ({
      loaiSanPham: typeof x.sanPham === 'string' ? x.sanPham : x.sanPham.loaiSanPham,
      sanPhamId: typeof x.sanPham === 'string' ? x.sanPham : x.sanPham.id,
      sanPham: typeof x.sanPham === 'string' ? x.sanPham : x.sanPham.id,
      soLuong: x.soLuong,
      yeuCauKhoaHocDatDuoc: x.yeuCauKhoaHoc
    })).filter(x => x.loaiSanPham === 'DAO_TAO');

    this.deTaiDto.sanPhamKhoaHocs = this.listSanPhamThuyetMinh.map((x) => ({
      loaiSanPham: typeof x.sanPham === 'string' ? x.sanPham : x.sanPham.loaiSanPham,
      sanPhamId: typeof x.sanPham === 'string' ? x.sanPham : x.sanPham.id,
      sanPham: typeof x.sanPham === 'string' ? x.sanPham : x.sanPham.id,
      soLuong: x.soLuong,
      yeuCauKhoaHocDatDuoc: x.yeuCauKhoaHoc
    })).filter(x => x.loaiSanPham === 'KHOA_HOC');

    this.deTaiDto.sanPhamUngDungs = this.listSanPhamThuyetMinh.map((x) => ({
      loaiSanPham: typeof x.sanPham === 'string' ? x.sanPham : x.sanPham.loaiSanPham,
      sanPhamId: typeof x.sanPham === 'string' ? x.sanPham : x.sanPham.id,
      sanPham: typeof x.sanPham === 'string' ? x.sanPham : x.sanPham.id,
      soLuong: x.soLuong,
      yeuCauKhoaHocDatDuoc: x.yeuCauKhoaHoc
    })).filter(x => x.loaiSanPham === 'UNG_DUNG');

    this.deTaiDto.sanPhamKhacs = this.listSanPhamThuyetMinh.map((x) => ({
      loaiSanPham: typeof x.sanPham === 'string' ? x.sanPham : x.sanPham.loaiSanPham,
      sanPhamId: typeof x.sanPham === 'string' ? x.sanPham : x.sanPham.id,
      sanPham: typeof x.sanPham === 'string' ? x.sanPham : x.sanPham.id,
      soLuong: x.soLuong,
      yeuCauKhoaHocDatDuoc: x.yeuCauKhoaHoc
    })).filter(x => !['UNG_DUNG', 'KHOA_HOC', 'DAO_TAO'].includes(x.loaiSanPham));

    this.deTaiDto.tinhCapThiet = this.form.get('tinhCapThiet').value;
    this.deTaiDto.mucTieu = this.form.get('mucTieu').value; //get từ bên đề xuất de tai ra
    this.deTaiDto.doiTuongNghienCuu = this.form.get('doiTuongNghienCuu').value;
    this.deTaiDto.phamViNghienCuu = this.form.get('phamViNghienCuu').value;
    this.deTaiDto.cachTiepCan = this.form.get('cachTiepCan').value;
    this.deTaiDto.phuongPhapNghienCuu = this.form.get('phuongPhapNghienCuu').value;
    this.deTaiDto.noiDungNghienCuu = this.form.get('noiDungNghienCuu').value;
    this.deTaiDto.hieuQua = this.form.get('hieuQua').value;
    this.deTaiDto.kinhPhiDuKien = this.overviewKinhPhiDuKien;
    this.deTaiDto.chuyenGiaoVaUngDung = this.form.get('chuyenGiaoVaUngDung').value;
    this.deTaiDto.donViId = this.form.get('donViId').value;
    this.deTaiDto.chiTietKinhPhiDuKiens = this.listChiTietKinhPhiDuKien.map(x => ({
      loaiKinhPhiId: x.loaiKinhPhi.id,
      thuTu: x.thuTu,
      nganSachNhaNuoc: x.nganSachNhaNuoc,
      nguonKinhPhiKhac: x.nguonKinhPhiKhac,
      tongKinhPhi: x.tongKinhPhi,
      ghiChu: x.ghiChu,
      chiTietKhoanChis: x.chiTietKhoanChis
    }));

    //Dữ liệu bên form01
    this.deTaiDto.tenDeTai = this.noiDungDeTai.tenDeTai;
    this.deTaiDto.tenDeTaiEn = this.noiDungDeTai.tenDeTaiEn;
    this.deTaiDto.mucTieuEn = this.noiDungDeTai.mucTieuEn;
    this.deTaiDto.noiDungChinh = this.noiDungDeTai.noiDungChinh;
    this.deTaiDto.hieuQuaDuKien = this.noiDungDeTai.hieuQuaDuKien;
    this.deTaiDto.nhuCauKinhPhiDuKien = this.noiDungDeTai.nhuCauKinhPhiDuKien;
    this.deTaiDto.thoiGianNghienCuuDuKien = this.noiDungDeTai.thoiGianNghienCuuDuKien;
    this.deTaiDto.sanPhamDuKien = this.noiDungDeTai.sanPhamDuKien;
    this.deTaiDto.thoiGianNghienCuuDuKien = this.noiDungDeTai.thoiGianNghienCuuDuKien;

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
    this.modalReturn.emit(false);
  }


  onSubmit() {
    this.mappingDataToDeTaiDto();
    if (this.form.valid) {
      this.deTaiSvc.updateDeTai(this.activatedRouterSvc.snapshot.params.id, this.deTaiDto)
        .subscribe(() => {
          this.alert.success(MessageConstant[this.langCode].MSG_UPDATED_DONE);
          this.modalReturn.emit(true);
        });
      this.alert.success(MessageConstant[this.langCode].MSG_UPDATED_DONE);
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
    this.loading = true;
    this.deTaiSvc.getDeTaiByChuNhiemVaStatus(
      dotDangKyId,
      [],
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
      }, () => {
        this.listDeTaiByChuNhiem.data = [];
        this.loading = false;
      });
  }

  getAllThoiGianQuyTrinh(): void {
    this.thoiGianQuyTrinhSvc.getAllThoiGianQuyTrinh()
      .subscribe(res => this.listThoiGianQuyTrinh = res);
  }

  aprovalProject() {
    this.deTaiSvc.approvalFaculty(this.modalData.data)
      .subscribe(() => {
        this.alert.success(MessageConstant[this.langCode].MGS_APPROVAL_SUCCESS);
        this.modalReturn.emit(true);
      }, () => this.alert.success(MessageConstant[this.langCode].MSG_ERR_SYSTEM));
  }
}
