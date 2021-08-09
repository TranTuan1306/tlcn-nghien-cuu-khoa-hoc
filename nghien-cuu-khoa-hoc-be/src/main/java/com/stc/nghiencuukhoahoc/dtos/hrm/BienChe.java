package com.stc.nghiencuukhoahoc.dtos.hrm;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 11/4/19
 * Time      : 8:42 AM
 * Filename  : EsPhong
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BienChe {
    private DonVi donVi;

    private ChucVu chucVu;
}
