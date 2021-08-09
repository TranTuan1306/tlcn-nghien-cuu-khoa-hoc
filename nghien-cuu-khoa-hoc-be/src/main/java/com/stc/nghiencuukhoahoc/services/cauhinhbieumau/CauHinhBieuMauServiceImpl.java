package com.stc.nghiencuukhoahoc.services.cauhinhbieumau;

import com.stc.nghiencuukhoahoc.dtos.CauHinhBieuMauDto;
import com.stc.nghiencuukhoahoc.entities.CauHinhBieuMau;
import com.stc.nghiencuukhoahoc.exceptions.InvalidException;
import com.stc.nghiencuukhoahoc.exceptions.NotFoundException;
import com.stc.nghiencuukhoahoc.repositories.CauHinhBieuMauRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 5/4/2021
 * Time: 4:31 PM
 * Filename: CauHinhBieuMauServiceImpl
 */
@Service
@Slf4j
public class CauHinhBieuMauServiceImpl implements CauHinhBieuMauService{
    private final CauHinhBieuMauRepository cauHinhBieuMauRepository;


    public CauHinhBieuMauServiceImpl(CauHinhBieuMauRepository cauHinhBieuMauRepository) {
        this.cauHinhBieuMauRepository = cauHinhBieuMauRepository;
    }

    @Override
    public CauHinhBieuMau getCauHinhCore() {
        List<CauHinhBieuMau> cauHinhHeThongs = cauHinhBieuMauRepository.findAll();
        if (cauHinhHeThongs.size() == 0) {
            throw new NotFoundException("Không tìm thấy cấu hình hệ thống");
        }
        return cauHinhHeThongs.get(0);
    }

    @Override
    public CauHinhBieuMau create(CauHinhBieuMauDto dto) {
        if(ObjectUtils.isEmpty(dto.getTenBenA())){
            throw new InvalidException("Vui lòng nhập tên bên A");
        }
        if(ObjectUtils.isEmpty(dto.getChucVuBenA())){
            throw new InvalidException("Vui lòng nhập chức vụ bên A");
        }
        if(ObjectUtils.isEmpty(dto.getThongTinTaiKhoanBenA())){
            throw new InvalidException("Vui lòng nhập thông tin tài khoản bên A");
        }
        if(ObjectUtils.isEmpty(dto.getCoQuanChuTri())){
            throw new InvalidException("Vui lòng nhập cơ quan chủ trì");
        }
        if(ObjectUtils.isEmpty(dto.getDonVi())){
            throw new InvalidException("Vui lòng nhập đơn vị");
        }
        if(cauHinhBieuMauRepository.count() != 0){
            throw new InvalidException("Đã có cấu hình biểu mẫu, vui lòng chỉnh sửa cấu hình có sẵn");
        }
        CauHinhBieuMau cauHinhBieuMau = new CauHinhBieuMau();
        cauHinhBieuMau.setTenBenA(dto.getTenBenA());
        cauHinhBieuMau.setChucVuBenA(dto.getChucVuBenA());
        cauHinhBieuMau.setThongTinTaiKhoanBenA(dto.getThongTinTaiKhoanBenA());
        cauHinhBieuMau.setCoQuanChuTri(dto.getCoQuanChuTri());
        cauHinhBieuMau.setDonVi(dto.getDonVi());
        cauHinhBieuMauRepository.save(cauHinhBieuMau);
        return cauHinhBieuMau;
    }

    @Override
    public CauHinhBieuMau update(String id, CauHinhBieuMauDto dto) {
        CauHinhBieuMau cauHinhBieuMau = cauHinhBieuMauRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Không tìm thầy cấu hình biểu mẫu"));
        if(ObjectUtils.isEmpty(dto.getTenBenA())){
            throw new InvalidException("Vui lòng nhập tên bên A");
        }
        if(ObjectUtils.isEmpty(dto.getChucVuBenA())){
            throw new InvalidException("Vui lòng nhập chức vụ bên A");
        }
        if(ObjectUtils.isEmpty(dto.getThongTinTaiKhoanBenA())){
            throw new InvalidException("Vui lòng nhập thông tin tài khoản bên A");
        }
        if(ObjectUtils.isEmpty(dto.getCoQuanChuTri())){
            throw new InvalidException("Vui lòng nhập cơ quan chủ trì");
        }
        if(ObjectUtils.isEmpty(dto.getDonVi())){
            throw new InvalidException("Vui lòng nhập đơn vị");
        }
        cauHinhBieuMau.setTenBenA(dto.getTenBenA());
        cauHinhBieuMau.setChucVuBenA(dto.getChucVuBenA());
        cauHinhBieuMau.setThongTinTaiKhoanBenA(dto.getThongTinTaiKhoanBenA());
        cauHinhBieuMau.setCoQuanChuTri(dto.getCoQuanChuTri());
        cauHinhBieuMau.setDonVi(dto.getDonVi());
        cauHinhBieuMauRepository.save(cauHinhBieuMau);
        return cauHinhBieuMau;
    }

    @Override
    public Page<CauHinhBieuMau> getAllCauHinhBieuMau(Pageable pageable) {
        return cauHinhBieuMauRepository.findAll(pageable);
    }
}
