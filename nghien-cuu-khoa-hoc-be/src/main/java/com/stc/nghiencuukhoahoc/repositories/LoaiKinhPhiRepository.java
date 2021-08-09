package com.stc.nghiencuukhoahoc.repositories;

import com.stc.nghiencuukhoahoc.entities.danhmuc.LoaiKinhPhi;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 3/10/2021
 * Time: 10:30 AM
 * Filename: LoaiKinhPhiRepository
 */
@Repository
public interface LoaiKinhPhiRepository extends MongoRepository<LoaiKinhPhi,String> {
    @Query(value = "{$or:[{ 'tenLoaiKinhPhi' : { $regex: ?0, $options: 'i' } }, { 'tenLoaiKinhPhiEn' : { $regex: ?0, $options: 'i' }}]}"
            ,sort = "{'trangThai': -1, 'tenLoaiKinhPhi': 1}")
    Page<LoaiKinhPhi> getAllLoaiKinhPhisPaging(String search, Pageable pageable);

    boolean existsByTenLoaiKinhPhiIgnoreCase(String tenLoaiKinhPhi);

    List<LoaiKinhPhi> findAllByTrangThaiTrue();
}
