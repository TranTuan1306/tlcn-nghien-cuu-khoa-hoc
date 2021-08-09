import { ThanhVienHoiDongNghiemThuDtos } from 'src/app/core/models/management/de-tai/thanh-vien-hoi-dong-nghiem-thu.model';
import { ThoiGianQuyTrinh } from './../cau-hinh/thoi-gian-quy-trinh.model';
import { DeTai } from './../de-tai/de-tai.model';
// Hội đồng nghiệm thu do TĐV đề xuất; phòng KHCN duyệt

import { HocHam } from '../danh-muc/hoc-ham.model';
import { HocVi } from '../danh-muc/hoc-vi.model';

export class HoiDongNghiemThu {
  deTai: DeTai;
  diaDiem: string;
  diemTrungBinhCuoi: number;
  fileBienBanHoiDong: string;
  fileGioiThieuThanhVien: string;
  id: string;
  ketLuanVaKienNghi: string;
  khachMoi: string;
  ngayHop: string;
  ngayQuyetDinh: string;
  soQuyetDinh: string;
  tenHoiDong: string;
  thanhVienHoiDongs: ThanhVienHoiDongNghiemThu[];
  thoiGianQuyTrinh: ThoiGianQuyTrinh;
  trangThaiDuyetHoiDong: boolean;
  xepLoai: string;
  isShow?: boolean;
}

export class ThanhVienHoiDongNghiemThu {
  chuyenMon: string;
  donViCongTac: string;
  email: string;
  fileNhanXetPhanBien: string;
  filePhieuDiemHoiDong: string;
  hoTen: string;
  hocHam: HocHam;
  hocVi: HocVi;
  nhiemVuHoiDong: string;
  soDienThoai: string;
  tongDiem: number;
  trangThaiDuyetThanhVien: boolean;
  isEdit?: boolean;
}

// export class ThanhVienHoiDongNghiemThuDto {
//   chuyenMon: string;
//   donViCongTac: string;
//   email: string;
//   hoTen: string;
//   hocHamId: string;
//   hocViId: string;
//   nhiemVuHoiDong: string;
//   soDienThoai: string;
//   trangThaiDuyetThanhVien: boolean;
//   constructor() {
//     this.chuyenMon = '';
//     this.donViCongTac = '';
//     this.email = '';
//     this.hoTen = '';
//     this.hocHamId = '';
//     this.hocViId = '';
//     this.nhiemVuHoiDong = '';
//     this.soDienThoai = '';
//     this.trangThaiDuyetThanhVien = false;
//   }
// }

export class BienBanHoiDongNghiemThu {
  id: string;
  tongDiem: number;
  tongDiemHopLe: number;
  ketLuan: string;
  xepLoai: string;
  fileBienBan: string;
}

export class CapNhatHoiDongNghiemThuDto {
  diaDiem: string;
  khachMoi: string;
  ngayHop: string;
  ngayQuyetDinh: string;
  soQuyetDinh: string;
  tenHoiDong: string;
}

export class ChuTichThuKyDeTaiDto {
  deTaiIds: string[];
  thanhVienHoiDongNghiemThuDtos: ThanhVienHoiDongNghiemThuDtos[];
  thoiGianQuyTrinhId: string;
}
