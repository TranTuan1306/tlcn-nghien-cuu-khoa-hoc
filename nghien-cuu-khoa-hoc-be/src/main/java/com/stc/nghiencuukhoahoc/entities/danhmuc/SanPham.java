package com.stc.nghiencuukhoahoc.entities.danhmuc;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 12/7/2020
 * Time: 2:05 PM
 * Filename: SanPham
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("san-pham")
public class SanPham {
    @Id
    private String id;

    private int soThuTu;

    // EnumLoaiSanPham
    private String loaiSanPham;

    private String tenSanPham;

    private String tenSanPhamEn;

    private boolean trangThai;
}
