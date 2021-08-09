package com.stc.nghiencuukhoahoc.dtos.detai;

import com.stc.nghiencuukhoahoc.entities.KinhPhiDuKien;
import com.stc.nghiencuukhoahoc.entities.LoaiHinhNghienCuu;
import com.stc.nghiencuukhoahoc.entities.ThoiGianQuyTrinh;
import com.stc.nghiencuukhoahoc.entities.danhmuc.LinhVuc;
import com.stc.nghiencuukhoahoc.entities.embeded.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 3/11/2021
 * Time: 10:08 AM
 * Filename: DeTaiDto
 */
@Getter
@Setter
@NoArgsConstructor
public class DeTaiDto {
    //<editor-fold desc="Đề xuất đăng ký đề tài">
    private String tenDeTai;

    private String tenDeTaiEn;

    // Khi đăng ký thì đề tài chưa có mã
    private String maSoTheoLinhVucNghienCuu;

    private String maSoTheoMucTieuNghienCuu;

    private String linhVucNghienCuuId;

    private String loaiHinhNghienCuuId;

    private String tinhCapThiet;

    private String mucTieu;

    private String mucTieuEn;

    private String noiDungChinh;

    private SanPhamDuKienDto sanPhamDuKien;

    private String hieuQuaDuKien;

    // Thời gian thực hiện (tháng)
    private int thoiGianNghienCuuDuKien;

    private double nhuCauKinhPhiDuKien;

    // Tự tính từ kinh phí thực hiện
    private KinhPhiDuKienDto kinhPhiDuKien;

    //<editor-fold desc="thuyết minh đề tài">
    private String doiTuongNghienCuu;

    private String phamViNghienCuu;

    private String cachTiepCan;

    // Trình bày dưới dạng đề cương nghiên cứu chi tiết
    private String noiDungNghienCuu;

    private List<TienDoThucHienDto> tienDoThucHiens = new ArrayList<>();

    private String phuongPhapNghienCuu;

    private List<ThanhVienCungThamGiaDto> thanhVienCungThamGias;

    private List<DonViPhoiHopDto> donViPhoiHops = new ArrayList<>();

    private List<ChiTietSanPhamDto> sanPhamKhoaHocs = new ArrayList<>();

    private List<ChiTietSanPhamDto> sanPhamDaoTaos = new ArrayList<>();

    private List<ChiTietSanPhamDto> sanPhamUngDungs = new ArrayList<>();

    private List<GiaiTrinhChinhSuaDto> giaiTrinhChinhSuas;

    // đối với đề tài cấp trọng điểm
    private List<ChiTietSanPhamKhacDto> sanPhamKhacs;

    private String hieuQua;

    private String chuyenGiaoVaUngDung;

    private List<ChiTietKinhPhiDuKienDto> chiTietKinhPhiDuKiens;

    private double kinhPhiDuocPhanBo;

    private TongQuanTinhHinhNghienCuuDto tongQuanTinhHinhNghienCuu;

    private String loaiDeTai;

    private String donViId;
}
