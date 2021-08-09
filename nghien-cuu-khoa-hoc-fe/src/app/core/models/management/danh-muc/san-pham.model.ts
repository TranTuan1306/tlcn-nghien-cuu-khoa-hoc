export class SanPham {
  id: string;
  soThuTu: number;
  loaiSanPham: string; // Enum loai sp
  tenSanPham: string;
  tenSanPhamEn: string;
  trangThai: boolean;
}

export class SanPhamDuKien {
  sanPhamKhoaHoc: string;
  sanPhamDaoTao: string;
  sanPhamUngDung: string;
  sanPhamKhac: string;
  constructor() {
    this.sanPhamKhoaHoc = '';
    this.sanPhamDaoTao = '';
    this.sanPhamUngDung = '';
    this.sanPhamKhac = '';
  }
}

export class ChiTietSanPham {
  id?: string; // Temp ID
  sanPham: SanPham | string;
  sanPhamEn: SanPham | string;
  soLuong: number;
  yeuCauKhoaHocDatDuoc?: string;
  yeuCauKhoaHoc: string;
}

export class ChiTietSanPhamDto {
  sanPham: SanPham | string;
  sanPhamId: SanPham | string;
  soLuong: number;
  yeuCauKhoaHocDatDuoc: string;
}

export class SanPhamTheoTienDo {
  sanPhamTheoThuyetMinh: SanPham;
  sanPhamDaDatDuoc: string;
  tuDanhGia: string;
}

export class ChiTietSanPhamKhac {
  id?: string; // Temp ID
  sanPham: string;
  sanPhamEn: string;
  soLuong: number;
  yeuCauKhoaHocDatDuoc: string;
}
