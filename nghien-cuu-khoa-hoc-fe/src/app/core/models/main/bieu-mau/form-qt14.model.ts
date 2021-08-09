import { DeTaiNCKH } from '../bieu-mau-common/de-tai-nckh.model';
import { ThanhVien } from '../bieu-mau-common/thanh-vien.model';

export class QT14BienBanDanhGiaDetai {
  deTai: DeTaiNCKH;
  chuNhiemDeTai: ThanhVien;
  quyetDinhThanhLapHoiDong: string;
  thanhVienHoiDongTongSo: number;
  thanhVienHoiDongCoMat: number;
  thanhVienHoiDongVangMat: number;
  khachMoiDu: ThanhVien[];
  diemSoTong: number;
  diemSoTongDau: number;
  diemSoTrungBinh: number;
  dauDiemHopLe: number;
  dauDiemKhongHopLe: number;
  tongDiemHopLe: number;
  diemTrungBinhCuoi: number;
  giaTriKhoaHoc: string;
  giaTriUngDung: string;
  hieuQuaGDDT: string;
  hieuQuaKTXH: string;
  phuongThucChuyenGiao: string;
  diaChiUngDung: string;
  noiDungCanChinhSuaBoSungHoanChinh: string;
  kienNghiKhaNangApDung: string;
  kienNghiKhaNangPhatTrien: string;
  xepLoai: string;
}
