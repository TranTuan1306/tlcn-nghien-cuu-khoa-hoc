package com.stc.nghiencuukhoahoc.services.hocvi;

import com.stc.nghiencuukhoahoc.dtos.hocvi.HocViDto;
import com.stc.nghiencuukhoahoc.entities.danhmuc.HocHam;
import com.stc.nghiencuukhoahoc.entities.danhmuc.HocVi;
import com.stc.nghiencuukhoahoc.exceptions.InvalidException;
import com.stc.nghiencuukhoahoc.exceptions.NotFoundException;
import com.stc.nghiencuukhoahoc.repositories.HocViRepository;
import com.stc.vietnamstringutils.VietnameseStringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class HocViServiceImpl implements HocViService {
    private final HocViRepository hocViRepository;

    private final VietnameseStringUtils vietnameseStringUtils;

    public HocViServiceImpl(HocViRepository hocViRepository, VietnameseStringUtils vietnameseStringUtils) {
        this.hocViRepository = hocViRepository;
        this.vietnameseStringUtils = vietnameseStringUtils;
    }

    @Override
    public List<HocVi> getAllActive() {
        try {
            List<HocVi> hocVis = hocViRepository.getAllByTrangThaiTrue();
            return hocVis;
        } catch (Exception e) {
            throw new InvalidException("Đã có lỗi trong quá trình lấy học vị!");
        }
    }

    @Override
    public Page<HocVi> getPaging(String search, Pageable pageable) {
        return hocViRepository.getAllHocVisPaging(vietnameseStringUtils.makeSearchRegex(search), pageable);
    }

    @Override
    public HocVi addNew(HocViDto dto) {
        try {
            if (hocViRepository.existsByTenVietTatIgnoreCase(dto.getTenVietTat())) {
                throw new InvalidException(String.format("Học vị %s đã tồn tại", dto.getTenVietTat()));
            }
            HocVi hocVi = new HocVi();
            hocVi.setTenHocVi(dto.getTenHocVi());
            hocVi.setTenHocViEn(dto.getTenHocViEn());
            hocVi.setTenVietTat(dto.getTenVietTat());
            hocVi.setTenVietTatEn(dto.getTenVietTatEn());
            hocVi.setTrangThai(true);
            hocViRepository.save(hocVi);
            return hocVi;
        } catch (Exception e) {
            throw new InvalidException("Đã có lỗi trong quá trình tạo học vị!");
        }
    }

    @Override
    public HocVi update(String hocViId, HocViDto dto) {
        try {
            HocVi hocVi = getHocVi(hocViId);
            if (hocViRepository.existsByTenVietTatIgnoreCase(dto.getTenVietTat()) && !dto.getTenVietTat().equalsIgnoreCase(hocVi.getTenVietTat())) {
                throw new InvalidException(String.format("Học vị %s đã tồn tại", dto.getTenVietTat()));
            }
            hocVi.setTenHocVi(dto.getTenHocVi());
            hocVi.setTenHocViEn(dto.getTenHocViEn());
            hocVi.setTenVietTat(dto.getTenVietTat());
            hocVi.setTenVietTatEn(dto.getTenVietTatEn());
            hocViRepository.save(hocVi);
            return hocVi;
        } catch (Exception e) {
            throw new InvalidException("Đã có lỗi trong quá trình cập nhật học vị!");
        }
    }

    @Override
    public HocVi changeStatus(String hocViId) {
        HocVi hocVi = getHocVi(hocViId);
        hocVi.setTrangThai(!hocVi.isTrangThai());
        hocViRepository.save(hocVi);
        return hocVi;
    }

    @Override
    public HocVi getHocVi(String hocViId) {
        return hocViRepository.findById(hocViId)
                .orElseThrow(() -> new NotFoundException(String.format("Học vị có id %s không tồn tại", hocViId)));
    }

    @Override
    public HocVi getHocViByTenHocVi(String ten) {
        return hocViRepository.findByTenHocVi(ten).orElse(null);
    }

    @Override
    public HocVi getHocViCore(String hocViId) {
        return hocViRepository.findByIdAndTrangThaiIsTrue(hocViId)
                .orElseThrow(() -> new NotFoundException(String.format("Học vị có id %s không tồn tại", hocViId)));
    }
}
