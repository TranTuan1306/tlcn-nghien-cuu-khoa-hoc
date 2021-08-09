package com.stc.nghiencuukhoahoc.dtos.detai;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 4/12/2021
 * Time: 9:26 AM
 * Filename: ChiTietSanPhamKhacDto
 */
@Getter
@Setter
@NoArgsConstructor
public class ChiTietSanPhamKhacDto {
    private String sanPham;

    private String sanPhamEn;

    private int soLuong;

    private String yeuCauKhoaHocDatDuoc;
}
