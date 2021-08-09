package com.stc.nghiencuukhoahoc.repositories;

import com.stc.nghiencuukhoahoc.entities.DeTai;
import com.stc.nghiencuukhoahoc.entities.LoaiHinhNghienCuu;
import com.stc.nghiencuukhoahoc.entities.danhmuc.LinhVuc;
import com.stc.nghiencuukhoahoc.entities.danhmuc.SanPham;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 12/9/2020
 * Time: 10:27 AM
 * Filename: SanPhamRepository
 */
public interface SanPhamRepository extends MongoRepository<SanPham, String> {
    @Query(value = "{$or:[{ 'tenSanPham' : { $regex: ?0, $options: 'i' }}, { 'tenSanPhamEn' : { $regex: ?0, $options: 'i' }},{ 'maSo' : { $regex: ?0, $options: 'i' }}]}"
            ,sort = "{'trangThai': -1, 'soThuTu': 1}")
    Page<SanPham> getAllSanPhamsPaging(String search, Pageable pageable);

    @Query(value = "{$and:[{'trangThai': true}, { 'loaiSanPham' : { $regex: ?0, $options: 'i' }}]}",
            sort = "{'trangThai': -1, 'soThuTu': 1}")
    List<SanPham> getAllLoaiSanPhamsAndTrangThaiIsTrue(String loaiSanPham);

    Optional<SanPham> findByIdAndTrangThaiIsTrue(String sanPhamId);

    List<SanPham>findAllByTrangThaiTrue();

    Optional<SanPham> getByTenSanPham(String tenSanPham);
}
