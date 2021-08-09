package com.stc.nghiencuukhoahoc.services.chuyenmucbaiviet;

import com.stc.nghiencuukhoahoc.dtos.ChuyenMucBaiVietDto;
import com.stc.nghiencuukhoahoc.entities.ChuyenMucBaiViet;
import com.stc.nghiencuukhoahoc.exceptions.InvalidException;
import com.stc.nghiencuukhoahoc.exceptions.NotFoundException;
import com.stc.nghiencuukhoahoc.repositories.ChuyenMucBaiVietRepository;
import com.stc.vietnamstringutils.VietnameseStringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;


/**
 * Created by IntelliJ IDEA.
 * User: vlong
 * Date: 28/05/2021
 * Time: 05:30 PM
 * Filename: ChuyenMucBaiVietServiceImpl
 */

@Service
@Slf4j
public class ChuyenMucBaiVietServiceImpl implements ChuyenMucBaiVietService{
    private final ChuyenMucBaiVietRepository chuyenMucBaiVietRepository;
    private final VietnameseStringUtils vietnameseStringUtils;

    public ChuyenMucBaiVietServiceImpl(ChuyenMucBaiVietRepository chuyenMucBaiVietRepository, VietnameseStringUtils vietnameseStringUtils) {
        this.chuyenMucBaiVietRepository = chuyenMucBaiVietRepository;
        this.vietnameseStringUtils = vietnameseStringUtils;
    }

    @Override
    public Page<ChuyenMucBaiViet> getChuyenMucBaiVietPaging(String search, Pageable pageable) {
        return chuyenMucBaiVietRepository.getAllChuyenMucBaiVietsPaging(vietnameseStringUtils.makeSearchRegex(search), pageable);
    }

    @Override
    public ChuyenMucBaiViet addChuyenMucBaiViet(ChuyenMucBaiVietDto chuyenMucBaiVietDto) {
        ChuyenMucBaiViet chuyenMucBaiViet = new ChuyenMucBaiViet();
        if(ObjectUtils.isEmpty(chuyenMucBaiVietDto.getMaChuyenMuc())){
            throw new InvalidException("Mã chuyên mục không để trống");
        }
        if(ObjectUtils.isEmpty(chuyenMucBaiVietDto.getTenChuyenMuc())){
            throw new InvalidException("Tên chuyên mục không để trống");
        }
        if(ObjectUtils.isEmpty(chuyenMucBaiVietDto.getTenChuyenMucEn())){
            throw new InvalidException("Tên chuyên mục (tiếng anh) không để trống");
        }
        chuyenMucBaiViet.setMaChuyenMuc(chuyenMucBaiVietDto.getMaChuyenMuc());
        chuyenMucBaiViet.setTenChuyenMuc(chuyenMucBaiVietDto.getTenChuyenMuc());
        chuyenMucBaiViet.setTenChuyenMucEn(chuyenMucBaiVietDto.getTenChuyenMucEn());
        chuyenMucBaiViet.setTrangThai(true);
        chuyenMucBaiVietRepository.save(chuyenMucBaiViet);
        return chuyenMucBaiViet;
    }

    @Override
    public ChuyenMucBaiViet updateChuyenMucBaiViet(String chuyenMucId, ChuyenMucBaiVietDto chuyenMucBaiVietDto) {
        ChuyenMucBaiViet chuyenMucBaiViet = getChuyenMucBaiViet(chuyenMucId);
        if(ObjectUtils.isEmpty(chuyenMucBaiVietDto.getMaChuyenMuc())){
            throw new InvalidException("Mã chuyên mục không để trống");
        }
        if(ObjectUtils.isEmpty(chuyenMucBaiVietDto.getTenChuyenMuc())){
            throw new InvalidException("Tên chuyên mục không để trống");
        }
        if(ObjectUtils.isEmpty(chuyenMucBaiVietDto.getTenChuyenMucEn())){
            throw new InvalidException("Tên chuyên mục (tiếng anh) không để trống");
        }
        chuyenMucBaiViet.setMaChuyenMuc(chuyenMucBaiVietDto.getMaChuyenMuc());
        chuyenMucBaiViet.setTenChuyenMuc(chuyenMucBaiVietDto.getTenChuyenMuc());
        chuyenMucBaiViet.setTenChuyenMucEn(chuyenMucBaiVietDto.getTenChuyenMucEn());
        chuyenMucBaiVietRepository.save(chuyenMucBaiViet);
        return chuyenMucBaiViet;
    }

    @Override
    public ChuyenMucBaiViet changeStatusChuyenMucBaiViet(String chuyenMucId) {
        ChuyenMucBaiViet chuyenMucBaiViet = getChuyenMucBaiViet(chuyenMucId);
        chuyenMucBaiViet.setTrangThai(!chuyenMucBaiViet.isTrangThai());
        chuyenMucBaiVietRepository.save(chuyenMucBaiViet);
        return chuyenMucBaiViet;
    }

    @Override
    public ChuyenMucBaiViet getChuyenMucBaiViet(String chuyenMucId) {
        return chuyenMucBaiVietRepository.findById(chuyenMucId)
                .orElseThrow(() -> new NotFoundException(String.format("Không tìm thấy chuyen muc với id: %s", chuyenMucId)));
    }

    @Override
    public Page<ChuyenMucBaiViet> getChuyenMucBaiVietActive(String search, Pageable pageable) {
        return chuyenMucBaiVietRepository.getAllChuyenMucBaiVietsActivePaging(vietnameseStringUtils.makeSearchRegex(search), pageable);
    }
}
