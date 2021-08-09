package com.stc.nghiencuukhoahoc.dtos.hoidongnghiemthu;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChuTichThuKyDeTaiDto {
    private List<String> deTaiIds;
    private List<ThanhVienHoiDongNghiemThuDto> thanhVienHoiDongNghiemThuDtos;
    private String thoiGianQuyTrinhId;
}
