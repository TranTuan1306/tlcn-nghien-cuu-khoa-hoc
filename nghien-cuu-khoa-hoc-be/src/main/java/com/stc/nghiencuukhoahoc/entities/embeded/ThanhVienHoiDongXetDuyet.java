package com.stc.nghiencuukhoahoc.entities.embeded;

import com.stc.nghiencuukhoahoc.entities.danhmuc.HocHam;
import com.stc.nghiencuukhoahoc.entities.danhmuc.HocVi;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 07/01/2021
 * Time      : 10:04
 * Filename  : ThanhVienHoiDongNghiemThu
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ThanhVienHoiDongXetDuyet {
    private NhanVienEd thanhVien;

    //Từ EnumVaiTroThanhVienHoiDongXetDuyet
    private String vaiTro;
}
