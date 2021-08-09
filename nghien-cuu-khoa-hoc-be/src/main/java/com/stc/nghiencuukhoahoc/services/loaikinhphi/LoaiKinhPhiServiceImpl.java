package com.stc.nghiencuukhoahoc.services.loaikinhphi;

import com.stc.nghiencuukhoahoc.dtos.LoaiKinhPhiDto;
import com.stc.nghiencuukhoahoc.entities.danhmuc.LoaiKinhPhi;
import com.stc.nghiencuukhoahoc.exceptions.InvalidException;
import com.stc.nghiencuukhoahoc.exceptions.NotFoundException;
import com.stc.nghiencuukhoahoc.repositories.LoaiKinhPhiRepository;
import com.stc.vietnamstringutils.VietnameseStringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 3/10/2021
 * Time: 10:26 AM
 * Filename: LoaiKinhPhiServiceImpl
 */
@Service
@Slf4j
public class LoaiKinhPhiServiceImpl implements LoaiKinhPhiService {
    private final LoaiKinhPhiRepository loaiKinhPhiRepository;

    private final VietnameseStringUtils vietnameseStringUtils;

    public LoaiKinhPhiServiceImpl(LoaiKinhPhiRepository loaiKinhPhiRepository, VietnameseStringUtils vietnameseStringUtils) {
        this.loaiKinhPhiRepository = loaiKinhPhiRepository;
        this.vietnameseStringUtils = vietnameseStringUtils;
    }


    @Override
    public List<LoaiKinhPhi> getAllLoaiKinhPhiByTrangThaiTrue() {
        try {
            return loaiKinhPhiRepository.findAllByTrangThaiTrue();
        } catch (Exception e) {
            throw new InvalidException("Đã có lỗi trong quá trình lấy loại kinh phí!");
        }
    }

    @Override
    public Page<LoaiKinhPhi> getPaging(String search, Pageable pageable) {
        return loaiKinhPhiRepository.getAllLoaiKinhPhisPaging(vietnameseStringUtils.makeSearchRegex(search), pageable);
    }

    @Override
    public LoaiKinhPhi addNew(LoaiKinhPhiDto dto) {
        try {
            if (loaiKinhPhiRepository.existsByTenLoaiKinhPhiIgnoreCase(dto.getTenLoaiKinhPhi())) {
                throw new InvalidException(String.format("Loại kinh phí %s đã tồn tại", dto.getTenLoaiKinhPhi()));
            }
            LoaiKinhPhi loaiKinhPhi = new LoaiKinhPhi();
            loaiKinhPhi.setTenLoaiKinhPhi(dto.getTenLoaiKinhPhi());
            loaiKinhPhi.setTenLoaiKinhPhiEn(dto.getTenLoaiKinhPhiEn());
            //Dùng enum???
            loaiKinhPhi.setFieldNames(dto.getFieldNames());
            loaiKinhPhi.setTrangThai(true);
            loaiKinhPhiRepository.save(loaiKinhPhi);
            return loaiKinhPhi;
        } catch (Exception e) {
            throw new InvalidException("Đã có lỗi trong quá trình tạo loại kinh phí!");
        }
    }

    @Override
    public LoaiKinhPhi update(String loaiKinhPhiId, LoaiKinhPhiDto dto) {
        try {
            LoaiKinhPhi loaiKinhPhi = getLoaiKinhPhi(loaiKinhPhiId);
            if (loaiKinhPhiRepository.existsByTenLoaiKinhPhiIgnoreCase(dto.getTenLoaiKinhPhi()) && !dto.getTenLoaiKinhPhi().equalsIgnoreCase(loaiKinhPhi.getTenLoaiKinhPhi())) {
                throw new InvalidException(String.format("Loại kinh phí %s đã tồn tại", dto.getTenLoaiKinhPhi()));
            }
            loaiKinhPhi.setTenLoaiKinhPhi(dto.getTenLoaiKinhPhi());
            loaiKinhPhi.setTenLoaiKinhPhiEn(dto.getTenLoaiKinhPhiEn());
            //Dùng enum???
            loaiKinhPhi.setFieldNames(dto.getFieldNames());
            loaiKinhPhiRepository.save(loaiKinhPhi);
            return loaiKinhPhi;
        } catch (Exception e) {
            throw new InvalidException("Đã có lỗi trong quá trình tạo loại kinh phí!");
        }
    }

    @Override
    public LoaiKinhPhi changeStatus(String loaiKinhPhiId) {
        LoaiKinhPhi loaiKinhPhi = getLoaiKinhPhi(loaiKinhPhiId);
        loaiKinhPhi.setTrangThai(!loaiKinhPhi.isTrangThai());
        loaiKinhPhiRepository.save(loaiKinhPhi);
        return loaiKinhPhi;
    }

    @Override
    public LoaiKinhPhi getLoaiKinhPhi(String loaiKinhPhiId) {
        return loaiKinhPhiRepository.findById(loaiKinhPhiId)
                .orElseThrow(() -> new NotFoundException(String.format("Không tìm thấy loại kinh phí với id: %s", loaiKinhPhiId)));
    }

}
