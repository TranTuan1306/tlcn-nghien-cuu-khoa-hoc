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
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DonVi {

    private String id;

    private String maDonVi;

    private String tenDonVi;

    private String tenDonViEn;

    private String trucThuoc;

    private DonVi donViCha;
}
