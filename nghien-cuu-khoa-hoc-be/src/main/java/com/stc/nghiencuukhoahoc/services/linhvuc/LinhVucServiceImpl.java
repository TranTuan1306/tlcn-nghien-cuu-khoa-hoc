package com.stc.nghiencuukhoahoc.services.linhvuc;

import com.stc.nghiencuukhoahoc.dtos.linhvuc.LinhVucDto;
import com.stc.nghiencuukhoahoc.entities.danhmuc.LinhVuc;
import com.stc.nghiencuukhoahoc.exceptions.InvalidException;
import com.stc.nghiencuukhoahoc.exceptions.NotFoundException;
import com.stc.nghiencuukhoahoc.repositories.LinhVucRepository;
import com.stc.vietnamstringutils.VietnameseStringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class LinhVucServiceImpl implements LinhVucService{
    private final LinhVucRepository linhVucRepository;

    private final VietnameseStringUtils vietnameseStringUtils;

    public LinhVucServiceImpl(LinhVucRepository linhVucRepository, VietnameseStringUtils vietnameseStringUtils) {
        this.linhVucRepository = linhVucRepository;
        this.vietnameseStringUtils = vietnameseStringUtils;
    }

    @Override
    public List<LinhVuc> getAllActive() {
            List<LinhVuc> linhVucs = linhVucRepository.getAllLinhVucsAndTrangThaiIsTrue();
            return linhVucs;
    }

    @Override
    public Page<LinhVuc> getPaging(String search, Pageable pageable) {
        return linhVucRepository.getAllLinhVucsPaging(vietnameseStringUtils.makeSearchRegex(search), pageable);
    }

    @Override
    public LinhVuc addNew(LinhVucDto dto) {
        try {
            if (linhVucRepository.existsByMaLinhVucIgnoreCase(dto.getMaLinhVuc())) {
                throw new InvalidException(String.format("Lĩnh vực %s đã tồn tại", dto.getTenLinhVuc()));
            }
            LinhVuc linhVuc = new LinhVuc();
            linhVuc.setThuTu(dto.getThuTu());
            linhVuc.setMaLinhVuc(dto.getMaLinhVuc());
            linhVuc.setTenLinhVuc(dto.getTenLinhVuc());
            linhVuc.setTenLinhVucEn(dto.getTenLinhVucEn());
            linhVuc.setTrangThai(true);
            linhVucRepository.save(linhVuc);
            return linhVuc;
        } catch (Exception e) {
            throw new InvalidException("Đã có lỗi trong quá trình tạo lĩnh vực!");
        }
    }

    @Override
    public LinhVuc update(String linhVucId, LinhVucDto dto) {
        try {
            LinhVuc linhVuc = getLinhVuc(linhVucId);
            if (linhVucRepository.existsByMaLinhVucIgnoreCase(dto.getMaLinhVuc()) && !dto.getMaLinhVuc().equalsIgnoreCase(linhVuc.getMaLinhVuc())){
                throw new InvalidException(String.format("Lĩnh vực %s đã tồn tại", dto.getTenLinhVuc()));
            }
            linhVuc.setThuTu(dto.getThuTu());
            linhVuc.setMaLinhVuc(dto.getMaLinhVuc());
            linhVuc.setTenLinhVuc(dto.getTenLinhVuc());
            linhVuc.setTenLinhVucEn(dto.getTenLinhVucEn());
            linhVucRepository.save(linhVuc);
            return linhVuc;
        } catch (Exception e) {
            throw new InvalidException("Đã có lỗi trong quá trình cập nhật lĩnh vực!");
        }
    }

    @Override
    public LinhVuc changeStatus(String linhVucId) {
        try {
            LinhVuc linhVuc = getLinhVuc(linhVucId);
            linhVuc.setTrangThai(!linhVuc.isTrangThai());
            linhVucRepository.save(linhVuc);
            return linhVuc;
        } catch (Exception e) {
            throw new InvalidException("Đã có lỗi trong quá trình xóa lĩnh vực!");
        }
    }

    @Override
    public LinhVuc getLinhVuc(String linhVucId) {
        return linhVucRepository.findById(linhVucId)
                .orElseThrow(() -> new NotFoundException(String.format("Không tìm thấy linh vực id: %s", linhVucId)));
    }

    @Override
    public LinhVuc getLinhVucCore(String linhVucId) {
        return linhVucRepository.findByIdAndTrangThaiIsTrue(linhVucId)
                .orElseThrow(() -> new NotFoundException(String.format("Không tìm thấy linh vực active với id: %s", linhVucId)));
    }
}
