import { NhanVienExt } from '../../common/hrm-nhan-vien.model';
import { HocHam } from '../danh-muc/hoc-ham.model';
import { HocVi } from '../danh-muc/hoc-vi.model';
import { LinhVucNghienCuu } from '../danh-muc/linh-vuc-nghien-cuu.model';

export class HoiDongDuyetThuyetMinh {
  id: string;
  tenHoiDong: string;
  linhVuc: LinhVucNghienCuu;
  soQuyetDinh: string;
  ngayQuyetDinh: Date;
  ngayHop: Date;
  diaDiem: string;
  deTaiIds: string[];
  thanhVienHoiDongs: ThanhVienHoiDongThuyetMinh[];
}

export class ThanhVienHoiDongThuyetMinh {
  thanhVien: NhanVienExt;
  vaiTro: string;
  hocHam: HocHam;
  hocVi: HocVi;
}
