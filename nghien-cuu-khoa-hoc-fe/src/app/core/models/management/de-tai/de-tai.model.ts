import { NhanVienExt } from '../../common/hrm-nhan-vien.model';
import { ThoiGianQuyTrinh } from '../cau-hinh/thoi-gian-quy-trinh.model';
import { KinhPhiDuKien, ChiTietKinhPhiDuKien } from '../danh-muc/kinh-phi.model';
import { LinhVucNghienCuu } from '../danh-muc/linh-vuc-nghien-cuu.model';
import { LoaiHinhNghienCuu } from '../danh-muc/loai-hinh-nghien-cuu.model';
import { SanPhamDuKien, ChiTietSanPham } from '../danh-muc/san-pham.model';

export class DeTai {
  id: string;
  loaiDetai: string; // Enum Loại đề tài (TRUONG, TRUONG_TRONG_DIEM, GIANG_VIEN_TRE, NGHIEN_CUU_SINH_CAO_HOC)
  tenDeTai: string; // form 1 + 2 dùng chung
  tenDeTaiEn: string; // form 11 dùng

  // Form đề xuất
  sanPhamDuKien: SanPhamDuKien;
  noiDungChinh: string;
  hieuQuaDuKien: string;
  nhuCauKinhPhiDuKien: number;

  // Form thuyết minh
  maSo: string; // Mã số CN nhập, sau khi duyệt TM, phòng KHCN công bố danh sách đề tài được duyệt + mã số + các yêu cầu chỉnh sửa TM
  maSoTheoLinhVucNghienCuu: string;
  maSoTheoMucTieuNghienCuu: string;
  linhVucNghienCuu: LinhVucNghienCuu; // Chọn 1, gần với đề tài nhất
  loaiHinhNghienCuu: LoaiHinhNghienCuu; // Chọn 1, gần với đề tài nhất
  thoiGianThucHienDuKien: number; // số tháng, form 1 + 2 dùng chung
  coQuanChuTri: string;
  chuNhiemDeTai: NhanVienExt;
  thanhVienCungThamGias: ThanhVienCungThamGia[]; // bắt buộc
  donViPhoiHops: DonViPhoiHop[]; // optional
  tongQuanTinhHinhNghienCuu: TongQuanTinhHinhNghienCuu; // CKeditor
  tinhCapThiet: string;
  mucTieuDeTai: string;  // form 1 + 2 dùng chung
  mucTieuDeTaiEn: string;  // form 1 + 2 dùng chung
  doiTuongNghienCuu: string;
  phamViNghienCuu: string;
  cachTiepCan: string;
  phuongPhapNghienCuu: string;
  noiDungNghienCuu: string;
  tienDoThucHiens: TienDoThucHien[];
  sanPhamKhoaHocs: ChiTietSanPham[]; // form 2 + 7 + 10 + 11 + 12 dùng chung
  sanPhamDaoTaos: ChiTietSanPham[]; // form 2 + 7 + 10 + 11 + 12 dùng chung
  sanPhamUngDungs: ChiTietSanPham[]; // form 2 + 7 + 10 + 11 + 12 dùng chung
  sanPhamKhacs: ChiTietSanPham[]; // form 2 + 7 + 10 + 11 + 12 dùng chung
  hieuQua: string;
  kinhPhiDuKien: KinhPhiDuKien; // Field này giúp FE/BE lấy nhanh dữ liệu chứ không cần thiết
  chiTietKinhPhiDuKiens: ChiTietKinhPhiDuKien[]; // 4 Phụ lục kinh phí
  kinhPhiDuocPhanBo: number; // Kinh phí mà phòng NCKH phân bổ xuống cho đề tài
  ngayDangKy: Date;
  thoiGianQuyTrinh: ThoiGianQuyTrinh;
  trangThaiDeTai: string; // Enum: CHUA_DUYET, DA_DUYET, TU_CHOI, DANG_NGHIEM_THU, v.v... bổ sung thêm trong quá trình làm

  // Thông tin KQ nghiên cứu
  tinhMoiSangTao: string;
  tinhMoiSangTaoEn: string;
  ketQuaNghienCuu: string;
  ketQuaNghienCuuEn: string;
  hieuQuaChuyenGiaoApDung: string;
  hieuQuaChuyenGiaoApDungEn: string;
  sanPhamKetQua: SanPhamDuKien;
  sanPhamKetQuaEn: SanPhamDuKien;

  giaiTrinhChinhSuas: GiaiTrinhChinhSua[];

  // Minh chứng
  fileDeXuatDeTais: string[];
  fileThuyetMinhDeTais: string[];
  fileKyHopDongs: string[]; // id File
  fileBanGiaoThietBis: string[]; // id File
  fileThanhLyHopDongs: string[]; // id file
  fileBaoCaoTienDos: string[];
  fileBienBanKiemTraThucHiens: string[];
  fileThongTinKetQuaNghienCuus: string[];
  fileThongTinKetQuaNghienCuuEns: string[];
  fileGiaiTrinhChinhSuas: string[];
}

export class TienDoThucHien {
  id?: string; // Temp ID
  noiDung: string;
  sanPham: string;
  thoiGian: number; // số tháng
  nguoiThucHien: string; // NhanVien? (chọn trong list ng tham gia thực hiện + CN đề tài)
}

export class ThanhVienCungThamGia {
  id?: string; // Temp ID
  hoTen: string;
  donViCongTac: string;
  linhVucChuyenMon: LinhVucNghienCuu;
  noiDungNghienCuuDuocGiaos: string[];
}

export class DonViPhoiHop {
  id?: string; // Temp ID
  tenDonVi: string;
  noiDungPhoiHop: string;
  hoTenNguoiDaiDien: string;
}

export class TongQuanTinhHinhNghienCuu {
  trongNuoc: string;
  ngoaiNuoc: string;
  congTrinhDaCongBo: string;
}

export class GiaiTrinhChinhSua {
  noiDungGopY: string;
  ketQuaChinhSuaBoSung: string;
  ghiChu: string;
}
