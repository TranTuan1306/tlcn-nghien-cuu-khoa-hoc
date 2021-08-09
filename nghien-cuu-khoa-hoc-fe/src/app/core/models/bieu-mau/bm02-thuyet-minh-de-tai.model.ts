/* BM02TD
THUYẾT MINH ĐỀ TÀI NĂM 20…
CẤP TRƯỜNG TRỌNG ĐIỂM/DÀNH CHO GIẢNG VIÊN TRẺ/ DÀNH CHO NGHIÊN CỨU SINH, HỌC VIÊN CAO HỌC
*/

import { LanguageConstant } from '../../constants/language.constant';

export class Bm02ThuyetMinhDeTai {
  deTai: string; // Id đề tài
  maSo: string;
  maSoTheoLinhVuc: string;
  maSoTheoDeTai: string;
  linhVucNghienCuu: string;
  loaiHinhNghienCuu: string;
  thoiGianThucHien: number;
  coQuanChuTriDeTai: string;
  chuNhiemDeTai: ChuNhiemDeTai;
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
  sanPhamKhoaHoc: string[];
  sanPhamDaoTao: string[];
  sanPhamUngDung: string[];
  sanPhamKhac: string;
  sanPham: SanPhamThuyetMinh[];
  hieuQua: string;
  phuongThucChuyenGiao: string;
  tongKinhPhi: number;
  nganSachNhaNuoc: number;
  nguonKinhPhiKhac: number;
  duTruCacMucChi: PhuLucCacKhoanChi[];
}

export class ChuNhiemDeTai {
  nhanVien: string;
  hocVi: string;
  donViCongTac: string;
  sdt: string;
}

export class ThanhVienThamGiaNghienCuu {
  id: string;
  hoTen: string;
  donViCongTac: string;
  linhVucChuyenMon: string;
  noiDungNghienCuuDuocGiao: string;
}

export class DonViPhoiHopChinh {
  id: string;
  tenDonVi: string;
  noiDungPhoiHop: string;
  hoTenNguoiDaiDien: string;
}

export class TienDoThucHien {
  id: string;
  noiDungCongViec: string;
  sanPham: string;
  thoiGian: number;
  nguoiThucHien: string;
}

export class SanPhamThuyetMinh {
  id: string;
  sanPham: string; // Server return
  loaiSanPham?: string; // DTO
  tenSanPham?: string; // DTO
  soLuong: number;
  yeuCauKhoaHoc: string;
}

export class ChiTietKinhPhi {
  tenKhoanChi: string;
  tongKinhPhi: number;
  nganSachNhaNuoc: number;
  nguonKinhPhiKhac: number;
  ghiChu: string;
}

export class KinhPhiOverview {
  t1ChiCongThamGiaTrucTiep: ChiTietKinhPhi;
  t2ChiMuaNguyenVatLieu: ChiTietKinhPhi;
  t3ChiSuaChuaMuaTaiSan: ChiTietKinhPhi;
  t4ChiKhac: ChiTietKinhPhi;
  constructor(langCodeInput: string) {
    const langCode = langCodeInput ? langCodeInput : 'en';
    this.t1ChiCongThamGiaTrucTiep = new ChiTietKinhPhi();
    this.t1ChiCongThamGiaTrucTiep.tenKhoanChi = LanguageConstant[langCode].PAYMENT_FOR_WORKING_DIRECTLY;
    this.t1ChiCongThamGiaTrucTiep.tongKinhPhi = this.t1ChiCongThamGiaTrucTiep.nganSachNhaNuoc =
    this.t1ChiCongThamGiaTrucTiep.nguonKinhPhiKhac = 0;
    this.t1ChiCongThamGiaTrucTiep.ghiChu = '';

    this.t2ChiMuaNguyenVatLieu = new ChiTietKinhPhi();
    this.t2ChiMuaNguyenVatLieu.tenKhoanChi = LanguageConstant[langCode].PAYMENT_FOR_MATERIALS;
    this.t2ChiMuaNguyenVatLieu.tongKinhPhi = this.t2ChiMuaNguyenVatLieu.nganSachNhaNuoc =
    this.t2ChiMuaNguyenVatLieu.nguonKinhPhiKhac = 0;
    this.t2ChiMuaNguyenVatLieu.ghiChu = '';

    this.t3ChiSuaChuaMuaTaiSan = new ChiTietKinhPhi();
    this.t3ChiSuaChuaMuaTaiSan.tenKhoanChi = LanguageConstant[langCode].PAYMENT_FOR_REPAIR_BUY_STATIC_ASSETS;
    this.t3ChiSuaChuaMuaTaiSan.tongKinhPhi = this.t3ChiSuaChuaMuaTaiSan.nganSachNhaNuoc =
    this.t3ChiSuaChuaMuaTaiSan.nguonKinhPhiKhac = 0;
    this.t3ChiSuaChuaMuaTaiSan.ghiChu = '';

    this.t4ChiKhac = new ChiTietKinhPhi();
    this.t4ChiKhac.tenKhoanChi = LanguageConstant[langCode].OTHER_PAYMENTS;
    this.t4ChiKhac.tongKinhPhi = this.t4ChiKhac.nganSachNhaNuoc =
    this.t4ChiKhac.nguonKinhPhiKhac = 0;
    this.t4ChiKhac.ghiChu = '';
  }
}

export class KinhPhiChiTiet {
  t1ChiCongThamGiaTrucTiep: PhuLucCacKhoanChi[];
  t2ChiMuaNguyenVatLieu: PhuLucCacKhoanChi[];
  t3ChiSuaChuaMuaTaiSan: PhuLucCacKhoanChi[];
  t4ChiKhac: PhuLucCacKhoanChi[];
}

export class PhuLucCacKhoanChi {
  id: string;
  noiDungChi: string;
  nganSachNhaNuoc: number;
  nguonKinhPhiKhac: number;
  ghiChu: string;

  duKienKetQua?: string;      // PL 1
  thoiGian?: Date;            // PL 1 4
  thanhTien?: number;         // PL 1 2 3
  tongKinhPhi?: number;       // PL 4
  donViTinh?: string;         // PL 2 3
  soLuong?: number;           // PL 2 3
  donGia?: number;            // PL 2 3
}
