package com.stc.nghiencuukhoahoc.dtos.hoidongnghiemthu;

import com.stc.nghiencuukhoahoc.entities.danhmuc.HocHam;
import com.stc.nghiencuukhoahoc.entities.danhmuc.HocVi;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ThanhVienHoiDongNghiemThuDto {
    private String hoTen;

    private String hocHamId;

    private String hocViId;

    private String chuyenMon;

    private String donViCongTac;

    private String email;

    private String soDienThoai;

    //Từ EnumVaiTroNhiemVuHoiDongNghiemThu
    private String nhiemVuHoiDong;

    private Boolean trangThaiDuyetThanhVien = null;
}
