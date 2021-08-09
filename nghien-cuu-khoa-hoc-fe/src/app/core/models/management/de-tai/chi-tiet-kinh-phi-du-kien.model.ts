import { ChiTietKhoanChi } from 'src/app/core/models/management/danh-muc/kinh-phi.model';

export class LoaiKinhPhi {
  fieldNames: string[];
  id: string;
  tenLoaiKinhPhi: string;
  tenLoaiKinhPhiEn: string;
  constructor() {
    this.fieldNames = [];
    this.id = '';
    this.tenLoaiKinhPhi = '';
    this.tenLoaiKinhPhiEn = '';
  }
}

export class ChiTietKinhPhiDuKien {
  chiTietKhoanChis: ChiTietKhoanChi[];
  ghiChu: string;
  loaiKinhPhiId: string;
  nganSachNhaNuoc: number;
  nguonKinhPhiKhac: number;
  thuTu: number;
  tongKinhPhi: number;
  constructor() {
    this.chiTietKhoanChis = [];
    this.ghiChu = '';
    this.loaiKinhPhiId = '';
    this.nganSachNhaNuoc = 0;
    this.nguonKinhPhiKhac = 0;
    this.thuTu = 0;
    this.tongKinhPhi = 0;
  }
}

