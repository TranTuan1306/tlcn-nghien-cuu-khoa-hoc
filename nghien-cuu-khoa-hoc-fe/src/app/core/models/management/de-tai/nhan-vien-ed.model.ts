import { HocVi } from './../danh-muc/hoc-vi.model';
import { HocHam } from './../danh-muc/hoc-ham.model';
export class NhanVienEd {
  chucVu: string;
  chucVuId: string;
  dienThoaiDiDong: string;
  donVi: string;
  donViId: string;
  email: string;
  gioiTinh: boolean;
  hoTen: string;
  maDonVi: string;
  ngaySinh: string;
  soHieuCongChuc: string;
  hocHam: HocHam;
  hocVi: HocVi;
  taiKhoanNganHang: TaiKhoanNganHangEd;
  isEdit?: boolean;
  vaiTro?: string;
  thanhVien?: NhanVienEd;
  hoTenDem?: string;
  ten?: string;
}

export class TaiKhoanNganHangEd {
  nganHang: NganHang;
  soTaiKhoan: string;
  trangThai: boolean;
}

export class NganHang {
  id: string;
  tenNganHang: string;
  tenVietTat: string;
}
