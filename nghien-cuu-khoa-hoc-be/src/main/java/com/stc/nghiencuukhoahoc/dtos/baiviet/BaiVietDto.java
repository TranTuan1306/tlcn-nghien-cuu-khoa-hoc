package com.stc.nghiencuukhoahoc.dtos.baiviet;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by IntelliJ IDEA.
 * User: vlong
 * Date: 7/5/2021
 * Time: 11:51 AM
 * Filename: BaiVietDto
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BaiVietDto {
    private String tieuDe;

    private String tieuDeEn;

    private String noiDung;

    private String noiDungEn;

    private String chuyenMucBaiVietId;
    
    private String fileAnhBia;
}
