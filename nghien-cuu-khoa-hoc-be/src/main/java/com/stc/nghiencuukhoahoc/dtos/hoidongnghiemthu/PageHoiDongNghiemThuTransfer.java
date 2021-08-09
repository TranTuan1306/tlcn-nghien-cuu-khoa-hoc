package com.stc.nghiencuukhoahoc.dtos.hoidongnghiemthu;

import com.stc.nghiencuukhoahoc.dtos.Total;
import com.stc.nghiencuukhoahoc.entities.HoiDongNghiemThu;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * Created by: IntelliJ IDEA
 * User: vlong
 * Date: 7/4/2021
 * Time: 04:05 AM
 * Filename: HoiDongNghiemThuService
 */


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PageHoiDongNghiemThuTransfer {
    private List<Total> total;

    private List<HoiDongNghiemThu> metaData;
}
