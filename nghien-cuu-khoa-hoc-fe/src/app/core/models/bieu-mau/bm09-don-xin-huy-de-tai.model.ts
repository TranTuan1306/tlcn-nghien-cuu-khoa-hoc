export class DonXinHuyDeTaiBM09 {
  id: string;
  hoTenChuNhiemDeTai: ChuNhiemDeTai;
  maSoChuNhiemDeTai: string;
  hoTenThanhVienDeTai: ThanhVienDeTai;
  maSoThanhVienDeTai: string;
  donViCongTac: string;
  donViCongTacEn: string;
  tenDeTai: string;
  tenDeTaiEn: string;
  maSoDeTai: string;
  thoiGianThucHien: Date;
  lyDoHuyDeTai: string;
  lyDoHuyDeTaiEn: string;
  tongKinhPhiTheoHopDong: number;
  soTienTamUng: number;
  ngayTamUng: Date;
  trangThai: boolean;
}
export class ChuNhiemDeTai {
  hoTen: string;
  hocVi: string;
  chucDanhKhoaHoc: string;
  namSinh: number;
  donViCongTac: string;
  sdt: string;
  email: string;
}
export class ThanhVienDeTai {
  hoTen: string;
  hocVi: string;
  chucDanhKhoaHoc: string;
  namSinh: number;
  donViCongTac: string;
  sdt: string;
  email: string;
}
export class TuChoiHuyDeTai {
  idDeTai: string;
  noiDungTuChoi: string;
}
