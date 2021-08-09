package com.stc.nghiencuukhoahoc.dtos.vanbanbieumau;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by IntelliJ IDEA.
 * User: vlong
 * Date: 7/6/2021
 * Time: 05:33 PM
 * Filename: VanBanBieuMauDto
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VanBanBieuMauDto {
    private String loai;

    private String tieuDe;

    private String tieuDeEn;

    private String fileDinhKem;
}
