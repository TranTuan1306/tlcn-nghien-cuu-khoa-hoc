// <!-- Biên bản thanh lý hợp đồng đề tài nghiên cứu khoa học -->
export class BienBanThanhLyBM19 {
  id: string;
  soHopDong: string;
  ngayKyHopDong: string;
  soGiayUyQuyen: string;
  ngayKyGiayUyQuyen: Date;
  ngayKyBienBanNghiemThu: Date;
  tenDeTai: string;
  tenDeTaiEn: string;
  hoTenBenA: string;
  chucVuBenA: string;
  soHieuTaiKhoanBenA: string;
  hoTenBenB: ChuNhiemDeTai;
  chucVuBenB: string;
  soHieuTaiKhoanBenB: string;
  diaChiNganHangBenB: string;
  soQuyetDinhNghiemThu: string;
  ngayKyQuyetDinhNghiemThu: Date;
  ngayKyBienBanHopHDNghiemThu: Date;
  kinhPhiTheoHopDong: number;
  kinhPhiDaDung: number;
  kinhPhiChiTuongUng: number;
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
