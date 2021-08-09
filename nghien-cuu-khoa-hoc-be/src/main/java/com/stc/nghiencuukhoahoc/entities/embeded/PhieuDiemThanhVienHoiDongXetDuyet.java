package com.stc.nghiencuukhoahoc.entities.embeded;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 07/01/2021
 * Time      : 10:28
 * Filename  : PhieuDiemThanhVienHoiDongXetDuyet
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PhieuDiemThanhVienHoiDongXetDuyet {
    private NhanVienEd thanhVien;

    private String filePhieuDiem;

    private double tongDiem;

    private String yKienKhac;

    private boolean ketLuan;
}
