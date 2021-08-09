// Hội đồng nghiệm thu do TĐV đề xuất, phòng KHCN duyệt

import { HocHam } from '../danh-muc/hoc-ham.model';
import { HocVi } from '../danh-muc/hoc-vi.model';

export class HoiDongNghiemThu {
  id: string;
  tenHoiDong: string;
  soQuyetDinh: string;
  ngayQuyetDinh: string;
  ngayHop: string;
  diaDiem: string;
  deTaiId: string;
  thanhVienHoiDongs: ThanhVienHoiDongNghiemThu[];
  khachMoi: string;
  ketLuanVaKienNghi: string;
  diemTrungBinhCuoi: number;
  xepLoai: string;
  fileBienBanHoiDong: string;
}

export class ThanhVienHoiDongNghiemThu {
  id: string;
  hoTen: string;
  hocHam: HocHam;
  hocVi: HocVi;
  chuyenMon: string;
  donViCongTac: string;
  nhiemVuHoiDong: string; // Enum
  fileNhanXetPhanBien: string;
  filePhieuDiemHoiDong: string;
  tongDiem: number;
  yKienKhac: string;
}

export class BienBanHoiDongNghiemThu {
  id: string;
  tongDiem: number;
  tongDiemHopLe: number;
  ketLuan: string;
  xepLoai: string;
  fileBienBan: string;
}
