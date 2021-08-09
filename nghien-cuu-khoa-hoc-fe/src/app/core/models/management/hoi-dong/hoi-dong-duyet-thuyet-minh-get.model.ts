import { HocVi } from 'src/app/core/models/management/danh-muc/hoc-vi.model';
import { HocHam } from 'src/app/core/models/management/danh-muc/hoc-ham.model';
import { LinhVucNghienCuu } from 'src/app/core/models/management/danh-muc/linh-vuc-nghien-cuu.model';
export class HoiDongDuyetThuyetMinhGet {
  deTaiIds: string[];
  diaDiem: string;
  id: string;
  linhVuc: LinhVucNghienCuu;
  ngayHop: string;
  ngayQuyetDinh: string;
  soQuyetDinh: string;
  tenHoiDong: string;
  thanhVienHoiDongs: ThanhVienHoiDongsGet[];
  thoiGianQuyTrinhId: string;
  bienBan?: boolean;
}

export class ThanhVienHoiDongsGet {
  vaiTro: string;
  thanhVien: ThanhVienGet;
  isEdit?: boolean;
}

export class ThanhVienGet {
  chucVu: string;
  chucVuId: string;
  dienThoaiDiDong: string;
  donVi: string;
  donViId: string;
  email: string;
  gioiTinh: boolean;
  hoTen: string;
  hocHam: HocHam;
  hocVi: HocVi;
  maDonVi: string;
  ngaySinh: string;
  soHieuCongChuc: string;
  taiKhoanNganHang: TaiKhoanNganHangGet;
  vaiTro?: string;
  thanhVien?: ThanhVienGet;
  hoTenDem?: string;
  ten?: string;
}

export class TaiKhoanNganHangGet {
  nganHang: NganHangGet;
  soTaiKhoan: string;
  trangThai: boolean;
}

export class NganHangGet {
  id: string;
  tenNganHang: string;
  tenVietTat: string;
}
