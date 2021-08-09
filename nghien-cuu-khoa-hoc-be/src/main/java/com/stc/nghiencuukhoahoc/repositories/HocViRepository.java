package com.stc.nghiencuukhoahoc.repositories;

import com.stc.nghiencuukhoahoc.entities.danhmuc.HocHam;
import com.stc.nghiencuukhoahoc.entities.danhmuc.HocVi;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HocViRepository extends MongoRepository<HocVi,String> {
    @Query(value = "{$or:[{ 'tenHocVi' : { $regex: ?0, $options: 'i' } }, { 'tenVietTat' : { $regex: ?0, $options: 'i' }}]}"
            ,sort = "{'trangThai': -1, 'tenHocVi': 1}")
    Page<HocVi> getAllHocVisPaging(String search, Pageable pageable);

    Optional<HocVi> findByIdAndTrangThaiIsTrue(String id);

    Optional<HocVi> findByTenHocVi(String tenHocVi);

    List<HocVi> getAllByTrangThaiTrue();

    boolean existsByTenVietTatIgnoreCase(String tenVietTat);
}
