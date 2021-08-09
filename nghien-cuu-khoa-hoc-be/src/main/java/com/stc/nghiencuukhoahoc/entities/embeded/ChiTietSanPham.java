package com.stc.nghiencuukhoahoc.entities.embeded;


import com.stc.nghiencuukhoahoc.entities.danhmuc.SanPham;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.DBRef;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 12/8/2020
 * Time: 10:42 AM
 * Filename: ChiTietSanPham
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChiTietSanPham {
    @DBRef
    private SanPham sanPham;

    private int soLuong;

    private String yeuCauKhoaHocDatDuoc;
}
