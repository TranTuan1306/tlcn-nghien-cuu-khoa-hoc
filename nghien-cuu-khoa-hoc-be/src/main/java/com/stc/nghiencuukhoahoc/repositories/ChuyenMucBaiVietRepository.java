package com.stc.nghiencuukhoahoc.repositories;

import com.stc.nghiencuukhoahoc.entities.ChuyenMucBaiViet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface ChuyenMucBaiVietRepository extends MongoRepository<ChuyenMucBaiViet,String> {
    @Query(value = "{$or:[{ 'maChuyenMuc' : { $regex: ?0, $options: 'i' }}, { 'tenChuyenMuc' : { $regex: ?0, $options: 'i' }},{ 'tenChuyenMucEn' : { $regex: ?0, $options: 'i' }}]}"
            , sort = "{'trangThai': -1, 'tenChuyenMuc': 1}")
    Page<ChuyenMucBaiViet> getAllChuyenMucBaiVietsPaging(String search, Pageable pageable);

    @Query(value = "{$or:[{ 'maChuyenMuc' : { $regex: ?0, $options: 'i' }}, { 'tenChuyenMuc' : { $regex: ?0, $options: 'i' }},{ 'tenChuyenMucEn' : { $regex: ?0, $options: 'i' }}], 'trangThai' : true}"
            , sort = "{'trangThai': -1, 'tenChuyenMuc': 1}")
    Page<ChuyenMucBaiViet> getAllChuyenMucBaiVietsActivePaging(String search, Pageable pageable);
}
