package com.stc.nghiencuukhoahoc.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by IntelliJ IDEA.
 * User: vlong
 * Date: 7/9/2021
 * Time: 11:51 AM
 * Filename: BannerDto
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BannerDto {
    private String thuTu;

    private String tieuDe;

    private String tieuDeEn;

    private String lienKetNgoai;

    private String fileBanner;
}
