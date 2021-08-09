import { HocVi } from './../danh-muc/hoc-vi.model';
import { HocHam } from './../danh-muc/hoc-ham.model';
export class ThanhVienHoiDongNghiemThuDtos {
  chuyenMon: string;
  donViCongTac: string;
  email: string;
  hoTen: string;
  hocHamId: string;
  hocHam?: string;
  hocViId: string;
  hocVi?: string;
  nhiemVuHoiDong: string;
  soDienThoai: string;
  trangThaiDuyetThanhVien: boolean;
  isEdit?: boolean;
  constructor() {
    this.chuyenMon = '';
    this.donViCongTac = '';
    this.email = '';
    this.hoTen = '';
    this.hocHam = '';
    this.hocHamId = '';
    this.hocVi = '';
    this.hocViId = '';
    this.nhiemVuHoiDong = '';
    this.soDienThoai = '';
    this.trangThaiDuyetThanhVien = null;
    this.isEdit = false;
  }
}

export class ThanhVienHoiDongs {
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
