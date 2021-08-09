export class DeNghiThanhToanBM18 {
  id: string;
  tenDeTai: string;
  tenDeTaiEn: string;
  maSoDeTai: string;
  chuNhiemDeTai: string;
  thoiGianThucHienTheoHopDong: string;
  tongKinhPhi: number;
  kinhPhiDaThanhToan: number;
  chiTietThanhToan: ChiTietThanhToan[];
  kinhPhiDaTamUng: number;
  kinhPhiDeNghiBoSung: number;
}

export class ChiTietThanhToan {
  noiDung: string;
  soTien: number;
  ghiChu: string;
}
