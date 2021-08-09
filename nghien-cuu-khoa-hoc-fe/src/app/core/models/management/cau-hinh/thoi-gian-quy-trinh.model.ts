export class ThoiGianQuyTrinh {
  id: string;
  namHoc: string;
  trangThai: boolean;

  batDauHuongDan: Date;
  ketThucHuongDan: Date; // = batDauKiemTraDanhGia

  batDauDangKy: Date;
  ketThucDangKy: Date; // = batDauKiemTraDanhGia

  batDauKiemTraDanhGia: Date;
  ketThucKiemTraDanhGia: Date; // = batDauXetDuyet

  batDauXetDuyet: Date;
  ketThucXetDuyet: Date; // = batDauKyHopDong

  batDauKyHopDong: Date;
  ketThucKyHopDong: Date;

  batDauThucHien: Date;
  yeuCauBoSungThuyetMinh: Date; // Trong 1/2 thời gian thực hiện đề tài, CN đề tài thực hiện bổ sung Thuyết minh theo BM06
  ketThucThucHien: Date;

  batDauNghiemThu1: Date;
  ketThucNghiemThu1: Date;
  batDauNghiemThu2: Date;
  ketThucNghiemThu2: Date;

  batDauThanhQuyetToan: Date;
  ketThucThanhQuyetToan: Date;

  constructor(inputYear?: number) {
    const curYear = inputYear ? inputYear : new Date().getFullYear();
    this.namHoc = `${curYear} - ${curYear + 2}`;
    this.trangThai = true;

    // Month: 0-11
    this.batDauHuongDan = new Date(curYear, 2); // Đầu tháng 3
    this.ketThucHuongDan = new Date(curYear, 4, 0, 23, 59, 59, 999); // Cuối tháng 4

    this.batDauDangKy = new Date(curYear, 3); // Đầu tháng 4
    this.ketThucDangKy = new Date(curYear, 4, 0, 23, 59, 59, 999); // Cuối tháng 4

    this.batDauKiemTraDanhGia = new Date(curYear, 4); // Đầu tháng 5
    this.ketThucKiemTraDanhGia = new Date(curYear, 5, 0, 23, 59, 59, 999); // Cuối tháng 5

    this.batDauXetDuyet = new Date(curYear, 5); // Đầu tháng 6
    this.ketThucXetDuyet = new Date(curYear + 1, 0, 0, 23, 59, 59, 999); // Cuối tháng 12

    this.batDauKyHopDong = new Date(curYear + 1, 0); // Đầu tháng 1 năm sau
    this.ketThucKyHopDong = new Date(curYear + 1, 2, 0, 23, 59, 59, 999); // Cuối tháng 2 năm sau

    this.batDauThucHien = new Date(curYear + 1, 1); // Đầu tháng 2 năm sau
    this.yeuCauBoSungThuyetMinh = new Date(curYear + 1, 7); // Đầu tháng 6 năm sau (1/2 thời gian thực hiện)
    this.ketThucThucHien = new Date(curYear + 1, 10, 0, 23, 59, 59, 999); // Cuối tháng 10 năm sau

    this.batDauNghiemThu1 = new Date(curYear + 1, 10); // Đầu tháng 11 năm sau
    this.ketThucNghiemThu1 = new Date(curYear + 2, 0, 0, 23, 59, 59, 999); // Cuối tháng 12 năm sau

    this.batDauNghiemThu2 = new Date(curYear + 2, 3); // Đầu tháng 4 năm sau nữa
    this.ketThucNghiemThu2 = new Date(curYear + 2, 5, 0, 23, 59, 59, 999); // Cuối tháng 5 năm sau nữa

    this.batDauThanhQuyetToan = new Date(curYear + 2, 5); // Đầu tháng 6 năm sau nữa
    this.ketThucThanhQuyetToan = new Date(curYear + 2, 6, 0, 23, 59, 59, 999); // Cuối tháng 6 năm sau nữa
  }
}
