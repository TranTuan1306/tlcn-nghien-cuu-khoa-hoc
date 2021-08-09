package com.stc.nghiencuukhoahoc.entities.embeded.BM07;

import com.stc.nghiencuukhoahoc.entities.danhmuc.SanPham;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.DBRef;

/**
 * Created by IntelliJ IDEA.
 * User: vlong
 * Date: 20/6/2021
 * Time: 10:30 PM
 * Filename: SanPhamKhacBM07
 */

@Getter
@Setter
@NoArgsConstructor
public class ChiTietSanPhamKhacBM07 {
    private String sanPhamTheoThuyetMinh;

    private String sanPhamTheoThuyetMinhEn;

    private String sanPhamDaDatDuoc;

    private String tuDanhGia;
}
