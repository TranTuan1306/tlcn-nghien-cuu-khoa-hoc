package com.stc.nghiencuukhoahoc.entities.embeded;

import com.stc.nghiencuukhoahoc.entities.embeded.BM07.ChiTietSanPhamBM07;
import com.stc.nghiencuukhoahoc.entities.embeded.BM07.ChiTietSanPhamKhacBM07;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 5/11/2021
 * Time: 8:42 AM
 * Filename: ThongTinKetQua
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ThongTinKetQua {
    private List<ChiTietSanPhamBM07> sanPhamKhoaHocs = new ArrayList<>();

    private List<ChiTietSanPhamBM07> sanPhamDaoTaos = new ArrayList<>();

    private List<ChiTietSanPhamBM07> sanPhamUngDungs = new ArrayList<>();

    private List<ChiTietSanPhamKhacBM07> sanPhamKhacs;

    private String hieuQuaPhuongThucChuyenGiao;

    private String hieuQuaPhuongThucChuyenGiaoEn;

    private String tinhMoi;

    private String tinhMoiEn;

    private String ketQuaNghienCuu;

    private String ketQuaNghienCuuEn;
}
