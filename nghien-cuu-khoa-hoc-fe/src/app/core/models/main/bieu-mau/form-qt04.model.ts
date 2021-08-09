import { ThanhVien } from '../bieu-mau-common/thanh-vien.model';
import { DeTaiNCKH } from '../bieu-mau-common/de-tai-nckh.model';

export class QT04BienBanHopTuyenChon {
  deTai: DeTaiNCKH;
  chuNhiemDeTai: ThanhVien;
  quyetDinhThanhLapHoiDong: string;
  ngayHop: Date;
  diaDiem: string;
  khachMoiDu: string;
  tongSoDiem: number;
}
