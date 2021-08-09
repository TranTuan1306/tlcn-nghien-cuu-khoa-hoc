package com.stc.nghiencuukhoahoc.services.hocham;

import com.stc.nghiencuukhoahoc.dtos.hocham.HocHamDto;
import com.stc.nghiencuukhoahoc.entities.danhmuc.HocHam;
import com.stc.nghiencuukhoahoc.exceptions.InvalidException;
import com.stc.nghiencuukhoahoc.exceptions.NotFoundException;
import com.stc.nghiencuukhoahoc.repositories.HocHamRepository;
import com.stc.vietnamstringutils.VietnameseStringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class HocHamServiceImpl implements HocHamService {

    private final HocHamRepository hocHamRepository;

    private final VietnameseStringUtils vietnameseStringUtils;

    public HocHamServiceImpl(HocHamRepository hocHamRepository, VietnameseStringUtils vietnameseStringUtils) {
        this.hocHamRepository = hocHamRepository;
        this.vietnameseStringUtils = vietnameseStringUtils;
    }

    @Override
    public List<HocHam> getAllHocHamActive() {
        try {
            return hocHamRepository.getAllByTrangThaiTrue();
        } catch (Exception e) {
            throw new InvalidException("Đã có lỗi trong quá trình lấy học hàm!");
        }
    }

    @Override
    public Page<HocHam> getPaging(String search, Pageable pageable) {
        return hocHamRepository.getAllHocHamsPaging(vietnameseStringUtils.makeSearchRegex(search), pageable);
    }

    @Override
    public HocHam addNew(HocHamDto dto) {
        try {
            if (hocHamRepository.existsByTenVietTatIgnoreCase(dto.getTenVietTat())) {
                throw new InvalidException(String.format("Học hàm %s đã tồn tại", dto.getTenVietTat()));
            }
            HocHam hocHam = new HocHam();
            hocHam.setTenHocHam(dto.getTenHocHam());
            hocHam.setTenHocHamEn(dto.getTenHocHamEn());
            hocHam.setTenVietTat(dto.getTenVietTat());
            hocHam.setTenVietTatEn(dto.getTenVietTatEn());
            hocHam.setTrangThai(true);
            hocHamRepository.save(hocHam);
            return hocHam;
        } catch (Exception e) {
            throw new InvalidException("Đã có lỗi trong quá trình tạo học hàm!");
        }
    }

    @Override
    public HocHam update(String hocHamId, HocHamDto dto) {
        try {
            HocHam hocHam = getHocHam(hocHamId);
            if (hocHamRepository.existsByTenVietTatIgnoreCase(dto.getTenVietTat()) && !dto.getTenVietTat().equalsIgnoreCase(hocHam.getTenVietTat())){
                throw new InvalidException(String.format("Học hàm %s đã tồn tại", dto.getTenVietTat()));
            }
            hocHam.setTenHocHam(dto.getTenHocHam());
            hocHam.setTenHocHamEn(dto.getTenHocHamEn());
            hocHam.setTenVietTat(dto.getTenVietTat());
            hocHam.setTenVietTatEn(dto.getTenVietTatEn());
            hocHamRepository.save(hocHam);
            return hocHam;
        } catch (Exception e) {
            throw new InvalidException("Đã có lỗi trong quá trình cập nhật học hàm!");
        }
    }

    @Override
    public HocHam changeStatus(String hocHamId) {
        HocHam hocHam = getHocHam(hocHamId);
        hocHam.setTrangThai(!hocHam.isTrangThai());
        hocHamRepository.save(hocHam);
        return hocHam;
    }

    @Override
    public HocHam getHocHam(String hocHamId) {
        return hocHamRepository.findById(hocHamId)
                .orElseThrow(() -> new NotFoundException(String.format("Không tìm thấy học hàm với id: %s", hocHamId)));
    }

    @Override
    public HocHam getHocHamByTen(String ten) {
        return hocHamRepository.findByTenHocHam(ten).orElse(null);
    }

    @Override
    public HocHam getHocHamCore(String hocHamId) {
        return hocHamRepository.findByIdAndTrangThaiIsTrue(hocHamId)
                .orElseThrow(() -> new NotFoundException(String.format("Không tìm thấy học hàm với id: %s", hocHamId)));
    }
}
