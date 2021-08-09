package com.stc.nghiencuukhoahoc.dtos.hrm;

import lombok.Getter;
import lombok.Setter;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 5/4/2021
 * Time: 2:39 PM
 * Filename: TaiKhoanNganHangEd
 */
@Getter
@Setter

public class TaiKhoanNganHangEd {
    private String soTaiKhoan;

    private NganHang nganHang; //Danh muc Ngan Hang

    private boolean trangThai = false;

}
