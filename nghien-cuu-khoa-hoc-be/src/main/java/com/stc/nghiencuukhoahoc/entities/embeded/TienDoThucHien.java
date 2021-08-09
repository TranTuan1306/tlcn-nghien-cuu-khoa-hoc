package com.stc.nghiencuukhoahoc.entities.embeded;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 3/11/20
 * Time      : 9:06 AM
 * Filename  : TienDoThucHien
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TienDoThucHien {
    private String noiDung;

    private String sanPham;

    // Số tháng
    private int thoiGian;

    private String nguoiThucHien;
}
