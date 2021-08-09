package com.stc.nghiencuukhoahoc.repositories;

import com.stc.nghiencuukhoahoc.entities.danhmuc.LinhVuc;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface LinhVucRepository extends MongoRepository<LinhVuc,String> {
    @Query(value = "{$or:[{ 'maLinhVuc' : { $regex: ?0, $options: 'i' } }, { 'tenLinhVuc' : { $regex: ?0, $options: 'i' }}]}",
            sort = "{'trangThai': -1, 'maLinhVuc': 1}")
    Page<LinhVuc> getAllLinhVucsPaging(String search, Pageable pageable);

    Page<LinhVuc> findAllByTenLinhVucContainsIgnoreCase(String tenLinhVuc, Pageable pageable);

    Optional<LinhVuc> findByMaLinhVuc(String maLinhVuc);

    @Query(value = "{'trangThai': true}",
            sort = "{'trangThai': -1, 'thuTu': 1}")
    List<LinhVuc> getAllLinhVucsAndTrangThaiIsTrue();

    Optional<LinhVuc> findByIdAndTrangThaiIsTrue(String linhVucId);

    boolean existsByMaLinhVucIgnoreCase(String maLinhVuc);
}
