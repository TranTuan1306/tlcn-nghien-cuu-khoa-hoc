import { DeTaiNCKH } from '../bieu-mau-common/de-tai-nckh.model';
import { ThanhVien } from '../bieu-mau-common/thanh-vien.model';

export class QT19BienBanThanhLyHopDong {
  soHopDong: string;
  ngayKyHopDong: string;
  soGiayUyQuyen: string;
  ngayKyGiayUyQuyen: Date;
  ngayKyBienBanNghiemThu: Date;
  deTai: DeTaiNCKH;
  benA: ThanhVien;
  benB: ThanhVien;
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
  hocHam: string;
  chucDanhKhoaHoc: string;
  namSinh: number;
  donViCongTac: string;
  sdt: string;
  email: string;
}
