import { SanPham } from 'src/app/core/models/management/danh-muc/san-pham.model';
// import { ChiTietKinhPhiDuKien } from 'src/app/core/models/management/danh-muc/kinh-phi.model';

export class BaoCaoTienDo {
  duKienKetQua: string;
  kienNghi: string;
  kinhPhiDaChi: KinhPhiDuKien;
  kinhPhiDaQuyetToan: number;
  kinhPhiThucHien: KinhPhiDuKien;
  noiDungBM07s: NoiDungBM07[];
  noiDungNghienCuu: string;
  // sanPhamBM07s: SanPhamBM07[];
  sanPhamDaoTaoBM07s: SanPhamDaoTaoBM07s[];
  sanPhamKhoaHocBM07s: SanPhamKhoaHocBM07s[];
  sanPhamUngDungBM07s: SanPhamUngDungBM07s[];
  sanPhamKhacBM07s: SanPhamKhacBM07s[];
  thoiGianBaoCaoTienDo: string;
  thoiGianNghiemThuDuKien: boolean;
  tuDanhGia: string;

  // chiTietKinhPhiDaChi: ChiTietKinhPhiDuKien;
  // chiTietKinhPhiThucHien: ChiTietKinhPhiDuKien;
  // duKienKetQua: string;
  // fileBaoCaoTienDo: string;
}

export class KinhPhiDuKien {
  nganSachNhaNuoc: number;
  nguonKinhPhiKhac: number;
  tongKinhPhi: number;
}

export class NoiDungBM07 {
  id?: string;
  noiDungNghienCuuDaThucHien: string;
  noiDungNghienCuuTheoThuyetMinh: string;
  tuDanhGia: string;
}

export class SanPhamBM07s {
  id?: string;
  sanPhamDaDatDuoc: string;
  sanPhamTheoThuyetMinh: SanPham | string;
  tuDanhGia: string;
  checkBox?: boolean;
  sanPhamId?: string;
  sanPham?: string;
}

export class SanPhamDaoTaoBM07s {
  id?: string;
  sanPhamDaDatDuoc: string;
  sanPhamTheoThuyetMinh: SanPham;
  tuDanhGia: string;
}

export class SanPhamKhoaHocBM07s {
  id?: string;
  sanPhamDaDatDuoc: string;
  sanPhamTheoThuyetMinh: SanPham;
  tuDanhGia: string;
}
export class SanPhamUngDungBM07s {
  id?: string;
  sanPhamDaDatDuoc: string;
  sanPhamTheoThuyetMinh: SanPham;
  tuDanhGia: string;
}
export class SanPhamKhacBM07s {
  id?: string;
  sanPhamDaDatDuoc: string;
  sanPhamTheoThuyetMinh: string;
  tuDanhGia: string;
  checkBox?: boolean;
}


