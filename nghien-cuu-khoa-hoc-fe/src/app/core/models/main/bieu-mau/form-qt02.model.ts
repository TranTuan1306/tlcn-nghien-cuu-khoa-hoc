import { ThanhVien } from '../bieu-mau-common/thanh-vien.model';
import { DeTaiNCKH } from '../bieu-mau-common/de-tai-nckh.model';

export class QT02ThuyetMinhDeTaiNCKH {
  deTai: DeTaiNCKH;
  linhVucNghienCuu: string;
  loaiHinhNghienCuu: string;
  thoiGianThucHien: number;
  coQuanChuTriDeTai: `Trường Đại Học Sư Phạm Kỹ Thuật TP.HCM\nSố 01 Võ Văn Ngân, Linh Chiểu, Thủ Đức, TP. HCM\nĐiện thoại: 0838.968.641`;
  chuNhiemDeTai: ThanhVien;
  thanhVienThamGiaNghienCuu: ThanhVienThamGiaNghienCuu[];
  donViPhoiHopChinh: DonViPhoiHopChinh[];
  tongQuanTinhHinhNghienCuuNgoaiNuoc: string;
  tongQuanTinhHinhNghienCuuTrongNuoc: string;
  danhMucCongTrinhDaCongBo: string;
  tinhCapThiet: string;
  mucTieu: string;
  doiTuongNghienCuu: string;
  phamViNghienCuu: string;
  cachTiepCan: string;
  phuongPhapNghienCuu: string;
  noiDungNghienCuu: string;
  tienDoThucHien: TienDoThucHien[];
  sanPhamKhoaHoc: string;
  sanPhamDaoTao: string;
  sanPhamUngDung: string;
  sanPhamKhac: string;
  yeuCauKhoaHoc: YeuCauKhoaHoc[];
  hieuQua: string;
  phuongThucChuyenGiao: string;
  tongKinhPhi: number;
  nganSachNhaNuoc: number;
  nguonKinhPhiKhac: number;
  duTruCacMucChi: MucChi[];
}

export class ThanhVienThamGiaNghienCuu {
  hoTen: string;
  donViCongTac: string;
  linhVucChuyenMon: string;
  noiDungNghienCuuDuocGiao: string;
}

export class DonViPhoiHopChinh {
  tenDonVi: string;
  noiDungPhoiHop: string;
  hoTenNguoiDaiDien: string;
}

export class TienDoThucHien {
  noiDungCongViec: string;
  sanPham: string;
  thoiGian: number;
  nguoiThucHien: string;
}

export class YeuCauKhoaHoc {
  tenSanPham: string;
  soLuong: number;
  yeuCauKhoaHoc: string;
}

export class MucChi {
  id: string;
  noiDungChi: string;
  tongKinhPhi: number;
  nganSachNhaNuoc: number;
  nguonKinhPhiKhac: number;
  ghiChu: string;
}

export class SumMucChi {
  tongKinhPhi: number;
  nganSachNhaNuoc: number;
  nguonKinhPhiKhac: number;
  ghiChu: string;
}
