package com.stc.nghiencuukhoahoc.dtos.hoidongxetduyet;

import com.stc.nghiencuukhoahoc.entities.danhmuc.HocHam;
import com.stc.nghiencuukhoahoc.entities.danhmuc.HocVi;
import com.stc.nghiencuukhoahoc.entities.embeded.NhanVienEd;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 4/13/2021
 * Time: 2:10 PM
 * Filename: ThanhVienHoiDongXetDuyetDto
 */
@Getter
@Setter
@NoArgsConstructor
public class ThanhVienHoiDongXetDuyetDto {
    private String email;

    //Từ EnumVaiTroThanhVienHoiDongXetDuyet
    private String vaiTro;
}
