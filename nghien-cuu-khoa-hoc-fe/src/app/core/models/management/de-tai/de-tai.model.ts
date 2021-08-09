import { ThoiGianQuyTrinh } from 'src/app/core/models/management/cau-hinh/thoi-gian-quy-trinh.model';
import { ChiTietSanPhamKhac } from './../danh-muc/san-pham.model';
import { ChiTietSanPham, SanPhamDuKien } from 'src/app/core/models/management/danh-muc/san-pham.model';
import { LoaiHinhNghienCuu } from 'src/app/core/models/management/danh-muc/loai-hinh-nghien-cuu.model';
import { DonXinHuy } from './don-xin-huy.model';
import { NhanVienEd } from './nhan-vien-ed.model';
import { BaoCaoTienDo } from './bao-cao-tien-do.model';
import { KinhPhiDuKien, ChiTietKinhPhiDuKien } from '../danh-muc/kinh-phi.model';
import { LinhVucNghienCuu } from '../danh-muc/linh-vuc-nghien-cuu.model';

export class DeTai {
  baoCaoTienDos: BaoCaoTienDo[];
  cachTiepCan: string;
  chiTietKinhPhiDuKiens: ChiTietKinhPhiDuKien[];
  chuNhiemDeTai: NhanVienEd;
  chuyenGiaoVaUngDung: string;
  doiTuongNghienCuu: string;
  donViId: string;
  donViPhoiHops: DonViPhoiHop[];
  donXinHuys: DonXinHuy[];
  fileBanGiaoThietBis: string[];
  fileBienBanKiemTraThucHiens: string[];
  fileBoSungThuyetMinhs: string[];
  fileDeNghiThanhToans: string[];
  fileGiaiTrinhChinhSuas: string[];
  fileKyHopDongs: string[];
  fileThanhLyHopDongs: string[];
  giaiTrinhChinhSuas: GiaiTrinhChinhSua[];
  hieuQua: string;
  hieuQuaDuKien: string;
  id: string;
  ketQuaNghienCuu: string;
  ketQuaNghienCuuEn: string;
  kinhPhiDuKien: KinhPhiDuKien;
  kinhPhiDuocPhanBo: number;
  linhVucNghienCuu: LinhVucNghienCuu;
  loaiHinhNghienCuu: LoaiHinhNghienCuu;
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
  sanPhamDaoTaos: ChiTietSanPham[];
  sanPhamDuKien: SanPhamDuKien;
  sanPhamKhacs: ChiTietSanPhamKhac[];
  sanPhamKhoaHocs: ChiTietSanPham[];
  sanPhamUngDungs: ChiTietSanPham[];
  tenDeTai: string;
  tenDeTaiEn: string;
  thanhVienCungThamGias: ThanhVienCungThamGia[];
  thoiGianNghienCuuDuKien: number;
  thoiGianQuyTrinh: ThoiGianQuyTrinh;
  thongTinKetQua: ThongTinKetQua;
  tienDoThucHiens: TienDoThucHien[];
  tinhCapThiet: string;
  tinhMoi: string;
  tinhMoiEn: string;
  tongQuanTinhHinhNghienCuu: TongQuanTinhHinhNghienCuu;
  trangThaiDeTai: string;
  isShow?: boolean;


  fileBaoCaoTienDos: string[];
  fileDeXuatDeTais: string[];
  fileThuyetMinhDeTais: string[];
  loaiDeTai: string;
}

export class GiaiTrinhChinhSua {
  noiDungGopY: string;
  ketQuaChinhSuaBoSung: string;
  ghiChu: string;
}

export class ThanhVienCungThamGia {
  id?: string; // Temp ID
  hoTen: string;
  donViCongTac: string;
  linhVucChuyenMon: LinhVucNghienCuu;
  linhVucId?: string;
  noiDungDuocGiaos: string[];
}

export class ThongTinKetQua {
  hieuQuaPhuongThucChuyenGiao: string;
  hieuQuaPhuongThucChuyenGiaoEn: string;
  ketQuaNghienCuu: string;
  ketQuaNghienCuuEn: string;
  sanPhamDaoTaos: ChiTietSanPhamBM07Dto[];
  sanPhamKhacs: ChiTietSanPhamKhacBM07Dto[];
  sanPhamKhoaHocs: ChiTietSanPhamBM07Dto[];
  sanPhamUngDungs: ChiTietSanPhamBM07Dto[];
  tinhMoi: string;
  tinhMoiEn: string;
}


export class ChiTietSanPhamKhacBM07Dto {
  sanPham: string;
  sanPhamDaDatDuoc: string;
  sanPhamEn: string;
  tuDanhGia: string;
}

export class ChiTietSanPhamBM07Dto {
  sanPhamDaDatDuoc: string;
  sanPhamId: string;
  tuDanhGia: string;
}

export class TienDoThucHien {
  id?: string; // Temp ID
  noiDung: string;
  sanPham: string;
  thoiGian: number; // số tháng
  nguoiThucHien: string; // NhanVien? (chọn trong list ng tham gia thực hiện + CN đề tài)
}

export class DonViPhoiHop {
  id?: string; // Temp ID
  tenDonVi: string;
  noiDungPhoiHop: string;
  daiDienDonVi: string;
}

export class TongQuanTinhHinhNghienCuu {
  thanhTuu: string;
  tinhHinhNgoaiNuoc: string;
  tinhHinhTrongNuoc: string;
}

