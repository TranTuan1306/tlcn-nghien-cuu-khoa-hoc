package com.stc.nghiencuukhoahoc.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 12/11/2020
 * Time: 4:00 PM
 * Filename: HocVienDto
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HocVienDto {
    private String email;

    private String maHocVien;

    private String hoTen;

    private Date ngaySinh;

    // nam: false, nữ: true
    private boolean gioiTinh;

    private List<String> roleList = new ArrayList<>();
}
