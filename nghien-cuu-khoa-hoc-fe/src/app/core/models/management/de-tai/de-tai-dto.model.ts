import { GiaiTrinhChinhSua } from 'src/app/core/models/bieu-mau/bm16-giai-trinh-chinh-sua.model';
import { DonViPhoiHop } from 'src/app/core/models/management/de-tai/de-tai.model';
import { ChiTietKhoanChi } from 'src/app/core/models/management/danh-muc/kinh-phi.model';
import { SanPhamDuKien, ChiTietSanPhamDto } from '../danh-muc/san-pham.model';

export class KinhPhiDuKien {
  nganSachNhaNuoc: number;
  nguonKinhPhiKhac: number;
  tongKinhPhi: number;
  constructor() {
    this.nganSachNhaNuoc = 0;
    this.nguonKinhPhiKhac = 0;
    this.tongKinhPhi = 0;
  }
}

export class TongQuanTinhHinhNghienCuuDto {
  thanhTuu: string;
  tinhHinhNgoaiNuoc: string;
  tinhHinhTrongNuoc: string;
  constructor() {
    this.thanhTuu = '';
    this.tinhHinhNgoaiNuoc = '';
    this.tinhHinhTrongNuoc = '';
  }
}

export class ChiTietKinhPhiDuKienDto {
  loaiKinhPhiId: string;
  thuTu: number;
  nganSachNhaNuoc: number;
  nguonKinhPhiKhac: number;
  tongKinhPhi: number;
  ghiChu: string;
  chiTietKhoanChis: ChiTietKhoanChi[];
  constructor() {
    this.chiTietKhoanChis = [];
    this.ghiChu = '';
    this.loaiKinhPhiId = '';
    this.nganSachNhaNuoc = 0;
    this.nguonKinhPhiKhac = 0;
    this.thuTu = 0;
    this.tongKinhPhi = 0;
  }
}


export class DeTaiDto {
  cachTiepCan: string;
  chiTietKinhPhiDuKiens: ChiTietKinhPhiDuKienDto[];
  chuyenGiaoVaUngDung: string;
  doiTuongNghienCuu: string;
  donViId: string;
  donViPhoiHops: DonViPhoiHop[];
  fileBanGiaoThietBis: string[];
  fileBaoCaoTienDos: string[];
  fileBienBanKiemTraThucHiens: string[];
  fileDeXuatDeTais: string[];
  fileGiaiTrinhChinhSuas: string[];
  fileKyHopDong: string;
  fileThanhLyHopDongs: string[];
  fileThuyetMinhDeTais: string[];
  giaiTrinhChinhSuas: GiaiTrinhChinhSua[];
  hieuQua: string;
  hieuQuaDuKien: string;
  kinhPhiDuKien: KinhPhiDuKien;
  kinhPhiDuocPhanBo: number;
  linhVucNghienCuuId: string;
  loaiDeTai: string;
  loaiHinhNghienCuuId: string;
  maSo: string;
  maSoTheoLinhVucNghienCuu: string;
  maSoTheoMucTieuNghienCuu: string;
  mucTieu: string;
  mucTieuEn: string;
  ngayDangKy: string;
  nhuCauKinhPhiDuKien: number;
  noiDungChinh: string;
  noiDungNghienCuu: string;
  phamViNghienCuu: string;
  phuongPhapNghienCuu: string;
  sanPhamDaoTaos: ChiTietSanPhamDto[];
  sanPhamDuKien: SanPhamDuKien;
  sanPhamKhacs: ChiTietSanPhamDto[];
  sanPhamKhoaHocs: ChiTietSanPhamDto[];
  sanPhamUngDungs: ChiTietSanPhamDto[];
  tenDeTai: string;
  tenDeTaiEn: string;
  thanhVienCungThamGias: ThanhVienCungThamGiaDto[];
  thoiGianNghienCuuDuKien: number;
  tienDoThucHiens: TienDoThucHienDto[];
  tinhCapThiet: string;
  tongQuanTinhHinhNghienCuu: TongQuanTinhHinhNghienCuuDto;
  constructor() {
    this.tenDeTai = '';
    this.tenDeTaiEn = '';
    this.tinhCapThiet = '';
    this.linhVucNghienCuuId = '';
    this.mucTieu = '';
    this.mucTieuEn = '';
    this.noiDungChinh = '';
    this.hieuQuaDuKien = '';
    this.nhuCauKinhPhiDuKien = 0;
    this.thoiGianNghienCuuDuKien = 0;
    this.sanPhamDuKien = new SanPhamDuKien();
    this.cachTiepCan = '';
    this.chiTietKinhPhiDuKiens = [];
    this.doiTuongNghienCuu = '';
    this.donViId = '';
    this.donViPhoiHops = [];
    this.fileBanGiaoThietBis = [];
    this.fileBaoCaoTienDos = [];
    this.fileBienBanKiemTraThucHiens = [];
    this.fileDeXuatDeTais = [];
    this.fileGiaiTrinhChinhSuas = [];
    this.fileKyHopDong = '';
    this.fileThanhLyHopDongs = [];
    this.fileThuyetMinhDeTais = [];
    this.giaiTrinhChinhSuas = [];
    this.hieuQua = '';
    this.kinhPhiDuKien = new KinhPhiDuKien();
    this.kinhPhiDuocPhanBo = 0;
    this.loaiDeTai = '';
    this.loaiHinhNghienCuuId = '';
    this.maSo = '';
    this.maSoTheoLinhVucNghienCuu = '';
    this.maSoTheoMucTieuNghienCuu = '';
    this.ngayDangKy = '';
    this.noiDungNghienCuu = '';
    this.phamViNghienCuu = '';
    this.phuongPhapNghienCuu = '';
    this.sanPhamDaoTaos = [];
    this.sanPhamKhacs = [];
    this.sanPhamKhoaHocs = [];
    this.sanPhamUngDungs = [];
    this.thanhVienCungThamGias = [];
    this.tienDoThucHiens = [];
    this.tongQuanTinhHinhNghienCuu = new TongQuanTinhHinhNghienCuuDto();
    this.chuyenGiaoVaUngDung = '';
  }
}

export class TienDoThucHienDto {
  nguoiThucHien: string;
  noiDung: string;
  sanPham: string;
  thoiGian: number;
}

export class ThanhVienCungThamGiaDto {
  id?: string; // Temp ID
  hoTen: string;
  donViCongTac: string;
  linhVucId: string;
  noiDungDuocGiaos: string[];
}

