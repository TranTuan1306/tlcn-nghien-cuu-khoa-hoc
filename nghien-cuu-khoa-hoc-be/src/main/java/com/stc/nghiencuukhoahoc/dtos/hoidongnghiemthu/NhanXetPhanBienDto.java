package com.stc.nghiencuukhoahoc.dtos.hoidongnghiemthu;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NhanXetPhanBienDto {
    private String email;
    private String fileNhanXetPhanBien;
    private String filePhieuDiemHoiDong;
    private double tongDiem;
}
