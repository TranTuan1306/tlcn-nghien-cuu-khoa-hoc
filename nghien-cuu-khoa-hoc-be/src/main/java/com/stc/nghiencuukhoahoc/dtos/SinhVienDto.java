package com.stc.nghiencuukhoahoc.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 12/11/2020
 * Time: 2:28 PM
 * Filename: SinhVienDto
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SinhVienDto {
    private String hoTen;

    private String maSinhVien;

    private String email;

    private Date ngaySinh;

    private boolean gioiTinh;
}
