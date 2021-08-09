/*BÁO CÁO TÌNH HÌNH THỰC HIỆN
ĐỀ TÀI KHOA HỌC VÀ CÔNG NGHỆ CẤP TRƯỜNG TRỌNG ĐIỂM/DÀNH CHO GIẢNG VIÊN TRẺ/ DÀNH CHO NGHIÊN CỨU SINH, HỌC VIÊN CAO HỌC*/
export class BaoCaoTienDoBM07 {
  id?: string;
  tenDeTai: string;
  tenDeTaiEn: string;
  maSoDeTai: string;
  chuNhiem: string;
  thoiGianThucHien: number;
  tongKinhPhi: number;
  kinhPhiDuocCap: number;
  kinhPhiDaChi: number;
  kinhPhiDaQuyetToan: number;
  tuDanhGia: string;
  tuDanhGiaEn: string;
  noiDungNghienCuu: string;
  noiDungNghienCuuEn: string;
  duKienKetQua: string;
  duKienKetQuaEn: string;
  kinhPhiThucHien: number;
  hoanThanhDungHan: string;
  hoanThanhTreHan: string;
  thoiGianNghiemThuDuKien: string;
  kienNghi: string;
  kienNghiEn: string;
  trangThai: boolean;
}

export class NoiDungNghienCuu {
  noiDungNghienCuuTheoThuyetMinh: string;
  noiDungNghienCuuTheoThuyetMinhEn: string;
  noiDungNghienCuuDaThucHien: string;
  noiDungNghienCuuDaThucHienEn: string;
  tuDanhGia: string;
  tuDanhGiaEn: string;
}

export class SanPhamNghienCuu {
  sanPhamTheoThuyetMinh: string;
  sanPhamTheoThuyetMinhEn: string;
  sanPhamDaDatDuoc: string;
  sanPhamDaDatDuocEn: string;
  tuDanhGia: string;
  tuDanhGiaEn: string;
}
