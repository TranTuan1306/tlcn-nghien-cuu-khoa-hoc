package com.stc.nghiencuukhoahoc.entities.embeded;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 5/6/2021
 * Time: 3:25 PM
 * Filename: DonXinHuy
 */
@Getter
@Setter
@NoArgsConstructor
public class DonXinHuy {
    private String lyDo;

    private double soTienDaTamUng;

    private Date thoiGianTamUng;

    private List<String> fileDonXinHuys = new ArrayList<>();

    private Date thoiGianXinHuy = new Date();
}
