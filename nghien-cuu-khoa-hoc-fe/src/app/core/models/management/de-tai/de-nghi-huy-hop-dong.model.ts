export class DeNghiHuyHopDong {
  id: string;
  deTaiId: string;
  lyDoHuy: string;
  kinhPhiTheoHopDong: number;
  kinhPhiDaTamUng: number;
  thoiGianTamUng: Date;
  ngayDeNghiHuy: Date;
  trangThaiHuy: string; // Enum: CHO_HUY, DA_HUY, KHONG_HUY,...
  fileDeNghiHuys: string[]; // id file
}
