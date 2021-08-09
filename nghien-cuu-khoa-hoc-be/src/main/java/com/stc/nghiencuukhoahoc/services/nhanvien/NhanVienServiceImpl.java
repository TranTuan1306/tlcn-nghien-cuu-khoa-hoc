package com.stc.nghiencuukhoahoc.services.nhanvien;

import com.stc.nghiencuukhoahoc.clients.HrmServiceClient;
import com.stc.nghiencuukhoahoc.dtos.hrm.NhanVien;
import com.stc.nghiencuukhoahoc.dtos.mapper.Mapper;
import com.stc.nghiencuukhoahoc.entities.embeded.NhanVienEd;
import com.stc.nghiencuukhoahoc.exceptions.InvalidException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by: IntelliJ IDEA
 * User: vlong
 * Date: 5/19/2021
 * Time: 9:24 AM
 * Filename: NhanVienServiceImpl
 */
@Service
@Slf4j
public class NhanVienServiceImpl implements NhanVienService {
    private final HrmServiceClient hrmServiceClient;

    public NhanVienServiceImpl(HrmServiceClient hrmServiceClient){

        this.hrmServiceClient = hrmServiceClient;
    }
    @Override
    public List<NhanVienEd> getAllNhanVienByDonVi(String donViId) {
        List<NhanVien> nhanViens = hrmServiceClient.getNhanVienByDonViId(donViId);
        List<NhanVienEd> nhanVienEds = new ArrayList<NhanVienEd>();
        for(NhanVien nhanVien: nhanViens){
            nhanVienEds.add(Mapper.convertNhanVien(nhanVien));
        }
        return nhanVienEds;
    }

    @Override
    public NhanVienEd getCurrent(Principal principal) {
        NhanVien nhanVien = hrmServiceClient.getNhanVienByEmail(principal.getName());
        if(ObjectUtils.isEmpty(nhanVien)){
            throw new InvalidException(String.format("Nhân viên với email: %s không tồn tại", principal.getName()));
        }
        return  Mapper.convertNhanVien(nhanVien);
    }

    @Override
    public NhanVienEd getByEmail(String email) {
        NhanVien nhanVien = hrmServiceClient.getNhanVienByEmail(email);
        if(ObjectUtils.isEmpty(nhanVien)){
            throw new InvalidException(String.format("Nhân viên với email: %s không tồn tại", email));
        }
        return Mapper.convertNhanVien(nhanVien);
    }
}
