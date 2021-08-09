package com.stc.nghiencuukhoahoc.entities.embeded;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 1/7/2021
 * Time: 3:51 PM
 * Filename: ChiTietKhoanChi
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChiTietKhoanChi {
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
