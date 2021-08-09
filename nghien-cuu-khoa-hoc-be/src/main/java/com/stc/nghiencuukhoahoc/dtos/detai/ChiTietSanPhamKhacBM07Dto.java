package com.stc.nghiencuukhoahoc.dtos.detai;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by IntelliJ IDEA.
 * User: vlong
 * Date: 21/6/2021
 * Time: 01:33 PM
 * Filename: ChiTietSanPhamBM07Dto
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChiTietSanPhamKhacBM07Dto {
    private String sanPham;

    private String sanPhamEn;

    private String sanPhamDaDatDuoc;

    private String tuDanhGia;
}
