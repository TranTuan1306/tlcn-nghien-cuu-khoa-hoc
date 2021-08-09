import { NhanVienExt } from '../../common/hrm-nhan-vien.model';

export class KiemTraTienDo {
  id: string;
  deTaiId: string;
  doanKiemTra: ThanhVienDoanKiemTra[];
  noiDungNghienCuuDaThucHien: string;
  ketQuaNghienCuuDaDatDuoc: string;
  sanPhamDaHoanThanh: string;
  tinhHinhSuDungKinhPhi: string;
  kienNghiCuaChuNhiem: string;
  kienNghiCuaCoQuanChuTri: string;
  danhGiaChungTinhHinhThucHien: string;
  ketLuanCuaDoanKiemTra: string;
  ngayKiemTra: Date;
  fileKiemTraTienDos: string[]; // id file
}

export class ThanhVienDoanKiemTra {
  thongTinCaNhan: NhanVienExt;
  chucVu: string;
}
