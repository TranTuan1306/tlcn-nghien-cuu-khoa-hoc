package com.stc.nghiencuukhoahoc.dtos.bieudienthanhvienhoidong;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BieuDiemThanhVienhoiDongDto {
    private String soThuTu;

    private String noiDung;

    private double diemToiThieu;

    private double diemToiDa;

    private double diemDanhGia;
}
