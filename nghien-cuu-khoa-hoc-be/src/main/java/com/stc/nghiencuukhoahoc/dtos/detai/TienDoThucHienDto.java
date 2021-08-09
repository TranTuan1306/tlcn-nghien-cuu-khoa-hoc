package com.stc.nghiencuukhoahoc.dtos.detai;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 4/9/2021
 * Time: 2:23 PM
 * Filename: TienDoThucHienDto
 */
@Getter
@Setter
@NoArgsConstructor
public class TienDoThucHienDto {
    private String noiDung;

    private String sanPham;

    private int thoiGian;

    private String nguoiThucHien;
}
