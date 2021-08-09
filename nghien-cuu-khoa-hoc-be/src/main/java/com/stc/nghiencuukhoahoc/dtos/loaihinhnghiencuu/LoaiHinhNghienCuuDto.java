package com.stc.nghiencuukhoahoc.dtos.loaihinhnghiencuu;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoaiHinhNghienCuuDto {
    private int thuTu;

    private String maLoaiHinh;

    private String tenLoaiHinh;

    private String tenLoaiHinhEn;

    private boolean trangThai;
}
