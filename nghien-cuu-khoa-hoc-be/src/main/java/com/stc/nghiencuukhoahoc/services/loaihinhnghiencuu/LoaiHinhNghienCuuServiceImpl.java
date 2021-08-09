package com.stc.nghiencuukhoahoc.services.loaihinhnghiencuu;

import com.stc.nghiencuukhoahoc.dtos.loaihinhnghiencuu.LoaiHinhNghienCuuDto;
import com.stc.nghiencuukhoahoc.entities.LoaiHinhNghienCuu;
import com.stc.nghiencuukhoahoc.exceptions.InvalidException;
import com.stc.nghiencuukhoahoc.exceptions.NotFoundException;
import com.stc.nghiencuukhoahoc.repositories.LoaiHinhNghienCuuRepository;
import com.stc.vietnamstringutils.VietnameseStringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class LoaiHinhNghienCuuServiceImpl implements LoaiHinhNghienCuuService {
    private final LoaiHinhNghienCuuRepository loaiHinhNghienCuuRepository;

    private final VietnameseStringUtils vietnameseStringUtils;


    public LoaiHinhNghienCuuServiceImpl(
            LoaiHinhNghienCuuRepository loaiHinhNghienCuuRepository,
            VietnameseStringUtils vietnameseStringUtils) {
        this.loaiHinhNghienCuuRepository = loaiHinhNghienCuuRepository;
        this.vietnameseStringUtils = vietnameseStringUtils;
    }

    @Override
    public List<LoaiHinhNghienCuu> getAllActive() {
            List<LoaiHinhNghienCuu> loaiHinhNghienCuus = loaiHinhNghienCuuRepository.getAllLoaiHinhNghienCuusAndTrangThaiIsTrue();
            return loaiHinhNghienCuus;
    }

    @Override
    public Page<LoaiHinhNghienCuu> getPaging(String search, Pageable pageable) {
        try {
            return loaiHinhNghienCuuRepository.getAllLoaiHinhsPaging(this.vietnameseStringUtils.makeSearchRegex(search), pageable);
        } catch (Exception e) {
            throw new InvalidException(String.format("Error %s ", e.getMessage()));
        }
    }

    @Override
    public LoaiHinhNghienCuu addNew(LoaiHinhNghienCuuDto dto) {
        try {
            if (loaiHinhNghienCuuRepository.existsByTenLoaiHinhIgnoreCase(dto.getMaLoaiHinh())) {
                throw new InvalidException(String.format("Loại hình nghiên cứu %s đã tồn tại", dto.getTenLoaiHinh()));
            }
            LoaiHinhNghienCuu loaiHinhNghienCuu = new LoaiHinhNghienCuu();
            loaiHinhNghienCuu.setThuTu(dto.getThuTu());
            loaiHinhNghienCuu.setMaLoaiHinh(dto.getMaLoaiHinh());
            loaiHinhNghienCuu.setTenLoaiHinh(dto.getTenLoaiHinh());
            loaiHinhNghienCuu.setTenLoaiHinhEn(dto.getTenLoaiHinhEn());
            loaiHinhNghienCuuRepository.save(loaiHinhNghienCuu);
            return loaiHinhNghienCuu;
        } catch (Exception e) {
            throw new InvalidException("Đã có lỗi trong quá trình tạo loại hình nghiên cứu!");
        }
    }

    @Override
    public LoaiHinhNghienCuu update(String loaiHinhNghienCuuId, LoaiHinhNghienCuuDto dto) {
        try {
            LoaiHinhNghienCuu loaiHinhNghienCuu = getLoaiHinhNghienCuu(loaiHinhNghienCuuId);
            if (loaiHinhNghienCuuRepository.existsByTenLoaiHinhIgnoreCase(dto.getMaLoaiHinh()) && !dto.getMaLoaiHinh().equalsIgnoreCase(loaiHinhNghienCuu.getMaLoaiHinh())) {
                throw new InvalidException(String.format("Loại hình nghiên cứu %s đã tồn tại", dto.getTenLoaiHinh()));
            }
            loaiHinhNghienCuu.setThuTu(dto.getThuTu());
            loaiHinhNghienCuu.setMaLoaiHinh(dto.getMaLoaiHinh());
            loaiHinhNghienCuu.setTenLoaiHinh(dto.getTenLoaiHinh());
            loaiHinhNghienCuu.setTenLoaiHinhEn(dto.getTenLoaiHinhEn());
            loaiHinhNghienCuuRepository.save(loaiHinhNghienCuu);
            return loaiHinhNghienCuu;
        } catch (Exception e) {
            throw new InvalidException("Đã có lỗi trong quá trình cập nhật loại hình nghiên cứu!");
        }
    }

    @Override
    public LoaiHinhNghienCuu changeStatus(String loaiHinhNghienCuuId) {
        try {
            LoaiHinhNghienCuu loaiHinhNghienCuu = getLoaiHinhNghienCuu(loaiHinhNghienCuuId);
            loaiHinhNghienCuu.setTrangThai(!loaiHinhNghienCuu.isTrangThai());
            loaiHinhNghienCuuRepository.save(loaiHinhNghienCuu);
            return loaiHinhNghienCuu;
        } catch (Exception e) {
            throw new InvalidException("Đã có lỗi trong quá trình đổi trạng thái!");
        }
    }

    @Override
    public LoaiHinhNghienCuu getLoaiHinhNghienCuu(String loaiHinhNghienCuuId) {
        return loaiHinhNghienCuuRepository.findById(loaiHinhNghienCuuId)
                .orElseThrow(() -> new NotFoundException(String.format("Không tìm thấy loại hình nghiên cứu với id: %s", loaiHinhNghienCuuId)));
    }

    @Override
    public LoaiHinhNghienCuu getLoaiHinhNghienCuuCore(String loaiHinhNghienCuuId) {
        return loaiHinhNghienCuuRepository.findByIdAndTrangThaiIsTrue(loaiHinhNghienCuuId)
                .orElseThrow(() -> new NotFoundException(String.format("Không tìm thấy loại hình nghiên cứu active với id: %s", loaiHinhNghienCuuId)));
    }
}
