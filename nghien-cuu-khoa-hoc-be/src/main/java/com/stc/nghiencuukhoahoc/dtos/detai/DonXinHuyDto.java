package com.stc.nghiencuukhoahoc.dtos.detai;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DonXinHuyDto {
    private String lyDo;

    private double soTienDaTamUng;

    private Date thoiGianTamUng;
}
