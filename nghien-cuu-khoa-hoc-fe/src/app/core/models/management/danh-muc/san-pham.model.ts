export class SanPham {
  id: string;
  soThuTu: number;
  loaiSanPham: string; // Enum loai sp
  tenSanPham: string;
  tenSanPhamEn: string;
  trangThai: boolean;
}

export class SanPhamDuKien {
  sanPhamKhoaHocs: string;
  sanPhamDaoTaos: string;
  sanPhamUngDungs: string;
  sanPhamKhacs: string;
}

export class ChiTietSanPham {
  id?: string; // Temp ID
  sanPham: SanPham | string;
  soLuong: number;
  yeuCauKhoaHoc: string;
}

export class SanPhamTheoTienDo {
  sanPhamTheoThuyetMinh: SanPham;
  sanPhamDaDatDuoc: string;
  tuDanhGia: string;
}
