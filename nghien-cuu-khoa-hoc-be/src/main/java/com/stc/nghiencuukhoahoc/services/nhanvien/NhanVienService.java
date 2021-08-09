package com.stc.nghiencuukhoahoc.services.nhanvien;

import com.stc.nghiencuukhoahoc.dtos.hrm.NhanVien;
import com.stc.nghiencuukhoahoc.entities.embeded.NhanVienEd;

import java.security.Principal;
import java.util.List;

/**
 * Created by: IntelliJ IDEA
 * User: vlong
 * Date: 5/19/2021
 * Time: 9:24 AM
 * Filename: NhanVienService
 */
public interface NhanVienService {
    List<NhanVienEd> getAllNhanVienByDonVi(String donViId);
    NhanVienEd getCurrent(Principal principal);
    NhanVienEd getByEmail(String email);
}
