package com.stc.nghiencuukhoahoc.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 12/25/2020
 * Time: 10:55 AM
 * Filename: ChiTieuDanhGia
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("chi-tieu-danh-gia")
public class ChiTieuDanhGia {
    @Id
    private String id;

    private String chiTieuDanhGia;

    private int soThuTu;

    private String noiDungDanhGia;

    private String noiDungDanhGiaEn;

    private int diemToiThieu;

    private int diemToiDa;

    private boolean trangThai;
}
