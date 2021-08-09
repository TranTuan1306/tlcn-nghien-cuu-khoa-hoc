package com.stc.nghiencuukhoahoc.dtos.hoidongxetduyet;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 4/23/2021
 * Time: 8:49 AM
 * Filename: BienBanHoiDongXetDuyetDto
 */
@Getter
@Setter
@NoArgsConstructor
public class BienBanHoiDongXetDuyetDto {
    private String deTaiId;

    private String hoiDongId;

//    private List<PhieuDiemThanhVienHoiDongXetDuyetDto> phieuDiemThanhViens = new ArrayList<>();

    private String khachMoi;

    private String kienNghiHoiDong;

    private boolean ketLuan;

     //upload file
    private String bienBanHoiDong;
}
