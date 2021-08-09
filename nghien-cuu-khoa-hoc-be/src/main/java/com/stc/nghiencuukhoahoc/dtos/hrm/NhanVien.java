package com.stc.nghiencuukhoahoc.dtos.hrm;

import com.stc.nghiencuukhoahoc.entities.danhmuc.HocHam;
import com.stc.nghiencuukhoahoc.entities.danhmuc.HocVi;
import com.stc.nghiencuukhoahoc.entities.embeded.HocHamEd;
import com.stc.nghiencuukhoahoc.entities.embeded.HocViEd;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

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
public class NhanVien {

    private String id;

    private String soHieuCongChuc;

    private String hoTen;

    private String email;

    private String dienThoaiDiDong;

    private boolean gioiTinh;

    private BienChe bienChe;

    private Date ngaySinh;

    private HocHamEd hocHam;

    private HocViEd hocVi;

    private TaiKhoanNganHangEd taiKhoanNganHang;
}
