package com.stc.nghiencuukhoahoc.entities.embeded;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 12/8/2020
 * Time: 10:43 AM
 * Filename: ChiTietSanPhamKhac
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChiTietSanPhamKhac {
    private String sanPham;

    private String sanPhamEn;

    private int soLuong;

    private String yeuCauKhoaHocDatDuoc;
}
