package com.stc.nghiencuukhoahoc.dtos.mapper;

import com.stc.nghiencuukhoahoc.dtos.hrm.DonVi;
import com.stc.nghiencuukhoahoc.dtos.hrm.NhanVien;
import com.stc.nghiencuukhoahoc.entities.embeded.DonViEd;
import com.stc.nghiencuukhoahoc.entities.embeded.NhanVienEd;

import java.util.Date;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 4/29/2021
 * Time: 9:40 AM
 * Filename: Mapper
 */
public class Mapper {
    public static NhanVienEd convertNhanVien(NhanVien nhanVien){
        NhanVienEd nhanVienEd = new NhanVienEd();
        nhanVienEd.setSoHieuCongChuc(nhanVien.getSoHieuCongChuc());
        nhanVienEd.setEmail(nhanVien.getEmail());
        nhanVienEd.setDienThoaiDiDong(nhanVien.getDienThoaiDiDong());
        nhanVienEd.setHoTen(nhanVien.getHoTen());
        nhanVienEd.setGioiTinh(nhanVien.isGioiTinh());
        nhanVienEd.setNgaySinh(nhanVien.getNgaySinh());
        nhanVienEd.setDonVi(nhanVien.getBienChe().getDonVi().getTenDonVi());
        nhanVienEd.setDonViId(nhanVien.getBienChe().getDonVi().getId());
        nhanVienEd.setMaDonVi(nhanVien.getBienChe().getDonVi().getMaDonVi());
        nhanVienEd.setChucVu(nhanVien.getBienChe().getChucVu()==null?null:nhanVien.getBienChe().getChucVu().getTenChucVu());
        nhanVienEd.setChucVuId(nhanVien.getBienChe().getChucVu()==null?null:nhanVien.getBienChe().getChucVu().getId());
        nhanVienEd.setTaiKhoanNganHang(nhanVien.getTaiKhoanNganHang());
        nhanVienEd.setHocHam(nhanVien.getHocHam() == null?null:nhanVien.getHocHam());
        nhanVienEd.setHocVi(nhanVien.getHocVi() == null?null:nhanVien.getHocVi());
        return nhanVienEd;
    }

    public static DonViEd convertDonVi(DonVi donVi){
        DonViEd donViEd = new DonViEd();
        donViEd.setId(donVi.getId());
        donViEd.setMaDonVi(donVi.getMaDonVi());
        donViEd.setTenDonVi(donVi.getTenDonVi());
        return donViEd;
    }
}
