package com.stc.nghiencuukhoahoc.entities;

import com.stc.nghiencuukhoahoc.entities.danhmuc.LinhVuc;
import com.stc.nghiencuukhoahoc.entities.embeded.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 3/2/20
 * Time      : 7:16 AM
 * Filename  : DeTai
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("de-tai")
public class DeTai {
    @Id
    private String id;

    //<editor-fold desc="Đề xuất đăng ký đề tài">
    private String tenDeTai;

    private String tenDeTaiEn;

    private String maSo;

    // Khi đăng ký thì đề tài chưa có mã
    private String maSoTheoLinhVucNghienCuu;

    private String maSoTheoMucTieuNghienCuu;

    private LinhVuc linhVucNghienCuu;

    private LoaiHinhNghienCuu loaiHinhNghienCuu;

    private String tinhCapThiet;

    private String mucTieu;

    private String mucTieuEn;

    private String tinhMoi;

    private String tinhMoiEn;

    private String ketQuaNghienCuu;

    private String ketQuaNghienCuuEn;

    private String noiDungChinh;

    private SanPhamDuKien sanPhamDuKien;

    private String hieuQuaDuKien;

    // Thời gian thực hiện (tháng)
    private int thoiGianNghienCuuDuKien;

    private double nhuCauKinhPhiDuKien;

    // Tự tính từ kinh phí thực hiện
    private KinhPhiDuKien kinhPhiDuKien;

    //<editor-fold desc="thuyết minh đề tài">
    private String doiTuongNghienCuu;

    private String phamViNghienCuu;

    private String cachTiepCan;

    // Trình bày dưới dạng đề cương nghiên cứu chi tiết
    private String noiDungNghienCuu;

    //BM02 15.2
    private List<TienDoThucHien> tienDoThucHiens = new ArrayList<>();

    private String phuongPhapNghienCuu;

    private NhanVienEd chuNhiemDeTai;

    private List<ThanhVienCungThamGia> thanhVienCungThamGias = new ArrayList<>();

    private List<DonViPhoiHop> donViPhoiHops = new ArrayList<>();

    private List<ChiTietSanPham> sanPhamKhoaHocs = new ArrayList<>();

    private List<ChiTietSanPham> sanPhamDaoTaos = new ArrayList<>();

    private List<ChiTietSanPham> sanPhamUngDungs = new ArrayList<>();

//    private List<GiaiTrinhChinhSua> giaiTrinhChinhSuas = new ArrayList<>();

    private List<ChiTietSanPhamKhac> sanPhamKhacs = new ArrayList<>();

    private String hieuQua;

    private String chuyenGiaoVaUngDung;

    private List<ChiTietKinhPhiDuKien> chiTietKinhPhiDuKiens = new ArrayList<>();

    private double kinhPhiDuocPhanBo;

    private ThoiGianQuyTrinh thoiGianQuyTrinh;

    private String trangThaiDeTai;

    private TongQuanTinhHinhNghienCuu tongQuanTinhHinhNghienCuu;

    private Date ngayDangKy = new Date();


    private List<String> fileKyHopDongs = new ArrayList<>();

    private List<String> fileBanGiaoThietBis = new ArrayList<>();

    private List<String> fileThanhLyHopDongs = new ArrayList<>();

    private List<String> fileGiaiTrinhChinhSuas = new ArrayList<>();

    private List<BaoCaoTienDo> baoCaoTienDos = new ArrayList<>();

    private List<String> fileBienBanKiemTraThucHiens = new ArrayList<>();

    private List<DonXinHuy> donXinHuys = new ArrayList<>();

    private List<String> fileDeNghiThanhToans = new ArrayList<>();

    //BM06 - lúc get sort theo ngày upload mới nhất
    //Chỉ upload file
    //Chỉnh sửa thuyết minh 1 lần
    private List<String> fileBoSungThuyetMinhs = new ArrayList<>();

//    private String loaiDeTai;

    private String donViId;

    //BM10
    private ThongTinKetQua thongTinKetQua;
}
