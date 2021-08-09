package com.stc.nghiencuukhoahoc.entities.embeded;

import com.stc.nghiencuukhoahoc.entities.embeded.BM07.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 5/6/2021
 * Time: 10:14 AM
 * Filename: BaoCaoTienDo
 */
@Getter
@Setter
@NoArgsConstructor
public class  BaoCaoTienDo {
    //II.
    // 1.Nội dung nghiên cứu
    private List<NoiDungBM07> noiDungBM07s = new ArrayList<>();

    // 2.1. Sản phẩm khoa học
    private List<ChiTietSanPhamBM07> sanPhamKhoaHocBM07s = new ArrayList<>();

    // 2.2. Sản phẩm đào tạo
    private List<ChiTietSanPhamBM07> sanPhamDaoTaoBM07s = new ArrayList<>();

    // 2.3. Sản phẩm ứng dụng
    private List<ChiTietSanPhamBM07> sanPhamUngDungBM07s = new ArrayList<>();

    // 2.4. Sản phẩm khác
    private List<ChiTietSanPhamKhacBM07> sanPhamKhacBM07s = new ArrayList<>();

    // 3. Kinh phí đề tài
    private String kinhPhiDaChi;

    private double kinhPhiDaQuyetToan;

    private String tuDanhGia;

    //III. Kế hoạch phát triển tiếp theo
    private String noiDungNghienCuu;

    private String duKienKetQua;

    private String kinhPhiThucHien;

    //Đợt 1: true, Đợt 2: false
    private boolean thoiGianNghiemThuDuKien;

    private String kienNghi;

    private List<String>fileBaoCaoTienDos = new ArrayList<>();

    private Date thoiGianBaoCaoTienDo = new Date();
}
