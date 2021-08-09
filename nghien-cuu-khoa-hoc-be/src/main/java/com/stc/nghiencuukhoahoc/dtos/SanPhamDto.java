package com.stc.nghiencuukhoahoc.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 12/9/2020
 * Time: 10:25 AM
 * Filename: SanPhamDto
 */
@Getter
@Setter
@NoArgsConstructor
public class SanPhamDto {
    private int soThuTu;

    private String loaiSanPham;

    private String tenSanPham;

    private String tenSanPhamEn;
}
