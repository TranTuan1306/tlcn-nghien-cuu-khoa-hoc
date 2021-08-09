import { HoiDongDuyetThuyetMinhGet } from './hoi-dong-duyet-thuyet-minh-get.model';
import { NhanVienEd } from './../de-tai/nhan-vien-ed.model';
import { DeTai } from './../de-tai/de-tai.model';

export class BienBanHoiDongThuyetMinhGet {
  bienBanHoiDong: string;
  deTai: DeTai;
  hoiDongXetDuyet: HoiDongDuyetThuyetMinhGet;
  id: string;
  ketLuan: boolean;
  khachMoi: string;
  kienNghiHoiDong: string;
  phieuDiemThanhViens: PhieuDiemThanhVienGet[];
}

export class PhieuDiemThanhVienGet {
  filePhieuDiem: string;
  ketLuan: boolean;
  thanhVien: NhanVienEd;
  tongDiem: number;
  ykienKhac: string;
}
