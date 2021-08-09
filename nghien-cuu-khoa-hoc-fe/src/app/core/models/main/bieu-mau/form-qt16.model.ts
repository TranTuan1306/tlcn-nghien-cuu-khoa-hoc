import { DeTaiNCKH } from '../bieu-mau-common/de-tai-nckh.model';
import { ThanhVien } from '../bieu-mau-common/thanh-vien.model';

export class QT16GiaiTrinhChinhSuaBaoCaoTongKet {
  deTai: DeTaiNCKH;
  chuNhiemDeTai: ThanhVien;
  giaiTrinhChinhSua: GiaiTrinhChinhSua[];
}

export class GiaiTrinhChinhSua {
  id: string;
  noiDungGopY: string;
  ketQuaChinhSuaBoSung: string;
  ghiChu: string;
}
