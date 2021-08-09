package com.stc.nghiencuukhoahoc.dtos.hoidongnghiemthu;

import com.stc.nghiencuukhoahoc.entities.DeTai;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;


/**
 * Created by: IntelliJ IDEA
 * User      : vlong
 * Date      : 28/6/20
 * Time      : 10:50 AM
 * Filename  : HoiDongNghiemThuDto
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HoiDongNghiemThuDto {
    private String tenHoiDong;

    private String soQuyetDinh;

    private Date ngayQuyetDinh;

    private Date ngayHop;

    private String diaDiem;

    private String khachMoi;
}
