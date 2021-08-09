package com.stc.nghiencuukhoahoc.dtos.detai;

import com.stc.nghiencuukhoahoc.entities.danhmuc.SanPham;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 4/9/2021
 * Time: 4:13 PM
 * Filename: ChiTietSanPhamDto
 */
@Getter
@Setter
@NoArgsConstructor
public class ChiTietSanPhamDto {
    private String sanPhamId;

    private int soLuong;

    private String yeuCauKhoaHocDatDuoc;
}
