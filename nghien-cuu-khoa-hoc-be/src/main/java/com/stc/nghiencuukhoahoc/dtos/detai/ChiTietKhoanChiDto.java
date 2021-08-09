package com.stc.nghiencuukhoahoc.dtos.detai;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 4/12/2021
 * Time: 10:11 AM
 * Filename: ChiTietKhoanChiDto
 */
@Getter
@Setter
@NoArgsConstructor
public class ChiTietKhoanChiDto {
    private String noiDungChi;

    private String duKienKetQua;

    private Date thoiGian;

    private String donViTinh;

    private int soLuong;

    private double donGia;

    private double thanhTien;

    private double tongKinhPhi;

    private double nganSachNhaNuoc;

    private double nguonKinhPhiKhac;

    private String ghiChu;
}
