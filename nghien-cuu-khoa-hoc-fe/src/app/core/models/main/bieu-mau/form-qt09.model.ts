import { ThanhVien } from '../bieu-mau-common/thanh-vien.model';
import { DeTaiNCKH } from '../bieu-mau-common/de-tai-nckh.model';

export class QT09DonXinHuyHopDong {
  chuNhiemDeTai: ThanhVien;
  thanhVienDeTai: ThanhVien;
  deTai: DeTaiNCKH;
  thoiGian: Date;
  lyDoHuyDeTai: string;
  tongKinhPhiTheoHopDong: number;
  soTienTamUng: number;
  thoiGianTamUng: Date;
}
