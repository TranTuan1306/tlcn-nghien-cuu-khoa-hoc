export class ChiTietKhoanChi { // sắp xếp đúng thứ tự này:
  id?: string; // Temp ID
  noiDungChi: string;

  duKienKetQua?: string;      // PL 1
  thoiGian?: Date;            // PL 1 4
  donViTinh?: string;         // PL 2 3
  soLuong?: number;           // PL 2 3
  donGia?: number;            // PL 2 3
  thanhTien?: number;         // PL 1 2 3
  tongKinhPhi?: number;       // PL 4

  nganSachNhaNuoc: number;
  nguonKinhPhiKhac: number;
  ghiChu: string;

  constructor(id?: string) {
    this.id = id ? id : Math.floor(Math.random() * 1000000000).toString();
    this.noiDungChi = '';
    this.duKienKetQua = '';
    this.thoiGian = new Date();
    this.donViTinh = '';
    this.soLuong = 0;
    this.donGia = 0;
    this.thanhTien = 0;
    this.tongKinhPhi = 0;
    this.nganSachNhaNuoc = 0;
    this.nguonKinhPhiKhac = 0;
    this.ghiChu = '';
  }
}

export class KinhPhiDuKien {
  tongKinhPhi: number;
  nganSachNhaNuoc: number;
  nguonKinhPhiKhac: number;
  constructor() {
    this.tongKinhPhi = 0;
    this.nganSachNhaNuoc = 0;
    this.nguonKinhPhiKhac = 0;
  }
}

export class LoaiKinhPhi {
  id: string;
  tenLoaiKinhPhi: string;
  tenLoaiKinhPhiEn: string;
  fieldNames: string[]; // list các field name trong phụ lục tương ứng, Ví dụ: noiDungChi, duKienKetQua,...
}

export class ChiTietKinhPhiDuKien {
  loaiKinhPhi: LoaiKinhPhi;
  thuTu: number;
  nganSachNhaNuoc: number;
  nguonKinhPhiKhac: number;
  tongKinhPhi: number;
  ghiChu: string;
  chiTietKhoanChis: ChiTietKhoanChi[];
}

export class KinhPhiTheoTienDo {
  kinhPhiDuocCap: number;
  kinhPhiDaChi: ChiTietKhoanChi[];
  kinhPhiDaQuyetToan: string;
  tuDanhGia: string;
}
