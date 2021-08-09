package com.stc.nghiencuukhoahoc.entities.embeded;

import com.stc.nghiencuukhoahoc.entities.danhmuc.LoaiKinhPhi;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 1/7/2021
 * Time: 3:42 PM
 * Filename: ChiTietKinhPhiDuKien
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChiTietKinhPhiDuKien {
    private LoaiKinhPhi loaiKinhPhi;

    private int thuTu;

    //Tổng cộng
    private double nganSachNhaNuoc;

    private double nguonKinhPhiKhac;

    private double tongKinhPhi;

    private String ghiChu;

    private List<ChiTietKhoanChi> chiTietKhoanChis;
}
