package com.stc.nghiencuukhoahoc.dtos.hoidongxetduyet;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 4/23/2021
 * Time: 10:14 AM
 * Filename: PhieuDiemThanhVienHoiDongXetDuyetDto
 */
@Getter
@Setter
@NoArgsConstructor
public class PhieuDiemThanhVienHoiDongXetDuyetDto {
    private String email;

    private String filePhieuDiem;

    private double tongDiem;

    private String yKienKhac;
}
