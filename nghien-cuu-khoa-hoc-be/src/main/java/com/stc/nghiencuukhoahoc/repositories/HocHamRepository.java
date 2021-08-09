package com.stc.nghiencuukhoahoc.repositories;

import com.stc.nghiencuukhoahoc.entities.danhmuc.HocHam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HocHamRepository extends MongoRepository<HocHam, String> {
    @Query(value = "{$or:[{ 'tenHocHam' : { $regex: ?0, $options: 'i' } }, { 'tenVietTat' : { $regex: ?0, $options: 'i' }}]}"
            ,sort = "{'trangThai': -1, 'tenHocHam': 1}")
    Page<HocHam> getAllHocHamsPaging(String search, Pageable pageable);

    List<HocHam> getAllByTrangThaiTrue();

    Optional<HocHam> findByTenHocHam(String tenHocHam);

    Optional<HocHam> findByIdAndTrangThaiIsTrue(String id);

    boolean existsByTenVietTatIgnoreCase(String tenVietTat);
}
