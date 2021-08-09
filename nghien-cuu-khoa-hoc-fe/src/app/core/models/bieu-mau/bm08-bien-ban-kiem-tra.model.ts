/*BIÊN BẢN KIỂM TRA TÌNH HÌNH THỰC HIỆN
ĐỀ TÀI CẤP TRƯỜNG TRỌNG ĐIỂM/DÀNH CHO GIẢNG VIÊN TRẺ/ DÀNH CHO NGHIÊN CỨU SINH, HỌC VIÊN CAO HỌC*/

export class BienBanKiemTraBM08 {
  id: string;
  tenDeTai: string;
  tenDeTaiEn: string;
  maSoDeTai: string;
  thoiGianThucHien: Date;
  tongKinhPhi: number;
  chuNhiemDeTai: ChuNhiemDeTai;
  hoTenChucTrachDoanKiemTra: string;
  hoTenChucTrachDoanKiemTraEn: string;
  noiDungNghienCuu: string;
  noiDungNghienCuuEn: string;
  ketQuaNghienCuu: string;
  ketQuaNghienCuuEn: string;
  cacSanPham: string;
  cacSanPhamEn: string;
  suDungKinhPhi: string;
  kienNghiCuaChuNhiemDeTaiVaCoQuanChuTri: string;
  kienNghiCuaChuNhiemDeTaiVaCoQuanChuTriEn: string;
  danhGiaTinhHinhThucHien: string;
  danhGiaTinhHinhThucHienEn: string;
  ketLuanCuaDoanKiemTra: string;
  ketLuanCuaDoanKiemTraEn: string;
  trangThai: boolean;
}
export class ChuNhiemDeTai {
  hoTen: string;
  hocVi: string;
  chucDanhKhoaHoc: string;
  namSinh: number;
  donViCongTac: string;
  sdt: string;
  email: string;
}
