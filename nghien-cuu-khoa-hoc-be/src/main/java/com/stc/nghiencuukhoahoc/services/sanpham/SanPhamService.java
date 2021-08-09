package com.stc.nghiencuukhoahoc.services.sanpham;

import com.stc.nghiencuukhoahoc.dtos.SanPhamDto;
import com.stc.nghiencuukhoahoc.entities.danhmuc.SanPham;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 12/9/2020
 * Time: 10:23 AM
 * Filename: SanPhamService
 */
public interface SanPhamService {
    List<SanPham> getAll();

    Page<SanPham> getPaging(String search, Pageable pageable);

    SanPham addNew(SanPhamDto dto);

    SanPham update(String sanPhamId, SanPhamDto dto);

    SanPham delete(String sanPhamId);

    List<SanPham> getAllByLoaiSanPhamAndTrangThaiTrue(String loaiSanPham);

    SanPham getByTenSanPham(String tenSanPham);

    SanPham getSanPham(String sanPhamId);
}
