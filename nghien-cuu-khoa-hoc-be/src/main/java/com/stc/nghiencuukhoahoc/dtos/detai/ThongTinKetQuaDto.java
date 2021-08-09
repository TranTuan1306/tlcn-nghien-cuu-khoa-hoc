package com.stc.nghiencuukhoahoc.dtos.detai;

import com.stc.nghiencuukhoahoc.entities.embeded.ChiTietSanPhamKhac;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ThongTinKetQuaDto {
    private String hieuQuaPhuongThucChuyenGiao;

    private String hieuQuaPhuongThucChuyenGiaoEn;

    private List<ChiTietSanPhamBM07Dto> sanPhamKhoaHocs = new ArrayList<>();

    private List<ChiTietSanPhamBM07Dto> sanPhamDaoTaos = new ArrayList<>();

    private List<ChiTietSanPhamBM07Dto> sanPhamUngDungs = new ArrayList<>();

    private List<ChiTietSanPhamKhacBM07Dto> sanPhamKhacs;

    private String tinhMoi;

    private String tinhMoiEn;

    private String ketQuaNghienCuu;

    private String ketQuaNghienCuuEn;
}
