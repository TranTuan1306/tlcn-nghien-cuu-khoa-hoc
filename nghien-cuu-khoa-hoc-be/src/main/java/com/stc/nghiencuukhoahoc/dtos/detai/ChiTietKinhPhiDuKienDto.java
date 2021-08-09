package com.stc.nghiencuukhoahoc.dtos.detai;

import com.stc.nghiencuukhoahoc.entities.embeded.ChiTietKhoanChi;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 4/12/2021
 * Time: 9:33 AM
 * Filename: ChiTietKinhPhiDuKienDto
 */
@Getter
@Setter
@NoArgsConstructor
public class ChiTietKinhPhiDuKienDto {
    private String loaiKinhPhiId;

    private int thuTu;

    //Tổng cộng
    private double nganSachNhaNuoc;

    private double nguonKinhPhiKhac;

    private double tongKinhPhi;

    private String ghiChu;

    private List<ChiTietKhoanChiDto> chiTietKhoanChis;
}
