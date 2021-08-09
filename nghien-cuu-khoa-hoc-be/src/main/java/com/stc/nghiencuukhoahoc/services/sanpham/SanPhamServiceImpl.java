package com.stc.nghiencuukhoahoc.services.sanpham;

import com.stc.nghiencuukhoahoc.dtos.SanPhamDto;
import com.stc.nghiencuukhoahoc.entities.danhmuc.SanPham;
import com.stc.nghiencuukhoahoc.exceptions.InvalidException;
import com.stc.nghiencuukhoahoc.exceptions.NotFoundException;
import com.stc.nghiencuukhoahoc.repositories.SanPhamRepository;
import com.stc.vietnamstringutils.VietnameseStringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 12/9/2020
 * Time: 10:23 AM
 * Filename: SanPhamServiceImpl
 */
@Service
@Slf4j
public class SanPhamServiceImpl implements SanPhamService{
    private final SanPhamRepository sanPhamRepository;

    private final VietnameseStringUtils vietnameseStringUtils;

    public SanPhamServiceImpl(SanPhamRepository sanPhamRepository, VietnameseStringUtils vietnameseStringUtils) {
        this.sanPhamRepository = sanPhamRepository;
        this.vietnameseStringUtils = vietnameseStringUtils;
    }

    @Override
    public List<SanPham> getAll() {
        try {
            List<SanPham> sanPhams = sanPhamRepository.findAllByTrangThaiTrue();
            return sanPhams;
        } catch (Exception e) {
            throw new InvalidException("Đã có lỗi trong quá trình lấy sản phẩm!");
        }
    }

    @Override
    public Page<SanPham> getPaging(String search, Pageable pageable) {
        return sanPhamRepository.getAllSanPhamsPaging(vietnameseStringUtils.makeSearchRegex(search), pageable);
    }

    @Override
    public SanPham addNew(SanPhamDto dto) {
        try {
            SanPham sanPham = new SanPham();
            sanPham.setSoThuTu(dto.getSoThuTu());
            sanPham.setLoaiSanPham(dto.getLoaiSanPham());
            sanPham.setTenSanPham(dto.getTenSanPham());
            sanPham.setTenSanPhamEn(dto.getTenSanPhamEn());
            sanPham.setTrangThai(true);
            sanPhamRepository.save(sanPham);
            return sanPham;
        } catch (Exception e) {
            throw new InvalidException("Đã có lỗi trong quá trình tạo sản phẩm!");
        }
    }

    @Override
    public SanPham update(String sanPhamId, SanPhamDto dto) {
        try {
            SanPham sanPham = sanPhamRepository.findById(sanPhamId)
                    .orElseThrow(() -> new NotFoundException(String.format("Không tìm thấy sản phẩm với id: %s", sanPhamId)));
            sanPham.setSoThuTu(dto.getSoThuTu());
            sanPham.setLoaiSanPham(dto.getLoaiSanPham());
            sanPham.setTenSanPham(dto.getTenSanPham());
            sanPham.setTenSanPhamEn(dto.getTenSanPhamEn());
            sanPhamRepository.save(sanPham);
            return sanPham;
        } catch (Exception e) {
            throw new InvalidException("Đã có lỗi trong quá trình cập nhật sản phẩm!");
        }
    }

    @Override
    public SanPham delete(String sanPhamId) {
        SanPham sanPham = sanPhamRepository.findById(sanPhamId)
                .orElseThrow(() -> new NotFoundException(String.format("Sản phẩm có id %s không tồn tại", sanPhamId)));
        sanPham.setTrangThai(!sanPham.isTrangThai());
        sanPhamRepository.save(sanPham);
        return sanPham;
    }

    @Override
    public List<SanPham> getAllByLoaiSanPhamAndTrangThaiTrue(String loaiSanPham) {
        return sanPhamRepository.getAllLoaiSanPhamsAndTrangThaiIsTrue(loaiSanPham);
    }

    @Override
    public SanPham getByTenSanPham(String tenSanPham) {
        return sanPhamRepository.getByTenSanPham(tenSanPham).orElse(null);
    }

    @Override
    public SanPham getSanPham(String sanPhamId) {
        return sanPhamRepository.findById(sanPhamId)
                .orElseThrow(() -> new NotFoundException(String.format("Không tìm thấy sản phẩm với id: %s", sanPhamId)));
    }


}
