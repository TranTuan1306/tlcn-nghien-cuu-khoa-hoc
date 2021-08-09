package com.stc.nghiencuukhoahoc.dtos.detai;

import com.stc.nghiencuukhoahoc.entities.embeded.BM07.ChiTietSanPhamBM07;
import com.stc.nghiencuukhoahoc.entities.embeded.BM07.ChiTietSanPhamKhacBM07;
import com.stc.nghiencuukhoahoc.entities.embeded.BM07.NoiDungBM07;
import com.stc.nghiencuukhoahoc.entities.embeded.ChiTietSanPhamKhac;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BaoCaoTienDoDto {
    //II.
    // 1.Nội dung nghiên cứu
    private List<NoiDungBM07> noiDungBM07s = new ArrayList<>();

    // 2.1. Sản phẩm khoa học
    private List<ChiTietSanPhamBM07Dto> sanPhamKhoaHocBM07s = new ArrayList<>();

    // 2.2. Sản phẩm đào tạo
    private List<ChiTietSanPhamBM07Dto> sanPhamDaoTaoBM07s = new ArrayList<>();

    // 2.3. Sản phẩm ứng dụng
    private List<ChiTietSanPhamBM07Dto> sanPhamUngDungBM07s = new ArrayList<>();

    // 2.4. Sản phẩm khác
    private List<ChiTietSanPhamKhacBM07Dto> sanPhamKhacBM07s = new ArrayList<>();

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
}
