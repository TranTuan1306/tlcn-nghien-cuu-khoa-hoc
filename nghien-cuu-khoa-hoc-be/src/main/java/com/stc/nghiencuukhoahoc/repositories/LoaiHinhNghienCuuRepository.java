package com.stc.nghiencuukhoahoc.repositories;

import com.stc.nghiencuukhoahoc.entities.LoaiHinhNghienCuu;
import com.stc.nghiencuukhoahoc.entities.danhmuc.LinhVuc;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface LoaiHinhNghienCuuRepository extends MongoRepository<LoaiHinhNghienCuu, String> {
    @Query(value = "{$or:[{ 'maLoaiHinh' : { $regex: ?0, $options: 'i' } }, { 'tenLoaiHinh' : { $regex: ?0, $options: 'i' }}]}",
            sort = "{'trangThai': -1, 'maLoaiHinh': 1}")
    Page<LoaiHinhNghienCuu> getAllLoaiHinhsPaging(String search, Pageable pageable);

    boolean existsByTenLoaiHinhIgnoreCase(String tenLoaiHinh);

    @Query(value = "{'trangThai': true}",
            sort = "{'trangThai': -1, 'thuTu': 1}")
    List<LoaiHinhNghienCuu> getAllLoaiHinhNghienCuusAndTrangThaiIsTrue();

    Optional<LoaiHinhNghienCuu> findByIdAndTrangThaiIsTrue(String loaiHinhNghienCuuId);

}
