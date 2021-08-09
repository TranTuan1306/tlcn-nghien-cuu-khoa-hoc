package com.stc.nghiencuukhoahoc.entities.embeded;

import com.stc.nghiencuukhoahoc.dtos.hrm.TaiKhoanNganHangEd;
import com.stc.nghiencuukhoahoc.entities.danhmuc.HocHam;
import com.stc.nghiencuukhoahoc.entities.danhmuc.HocVi;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

/**
 * Created by Intellij IDEA.
 * User: Tín Nguyễn.
 * Date: 2019-11-04.
 * Time: 01:25.
 * Filename: NhanVienEd.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NhanVienEd {

    private String soHieuCongChuc;

    private String email;

    private String dienThoaiDiDong;

    private String hoTen;

    private boolean gioiTinh;

    private Date ngaySinh;

    private String donVi; //ten don vi

    private String donViId;

    private String maDonVi;

    private String chucVu; //ten chuc vu

    private String chucVuId;

    private HocHamEd hocHam;

    private HocViEd hocVi;

    private TaiKhoanNganHangEd taiKhoanNganHang;
}
