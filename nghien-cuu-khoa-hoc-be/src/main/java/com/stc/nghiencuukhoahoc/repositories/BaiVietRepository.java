package com.stc.nghiencuukhoahoc.repositories;

import com.stc.nghiencuukhoahoc.entities.danhmuc.BaiViet;
import org.springframework.data.domain.Page;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import org.springframework.data.domain.Pageable;

/**
 * Created by IntelliJ IDEA.
 * User: vlong
 * Date: 7/5/2021
 * Time: 11:47 AM
 * Filename: BaiVietRepository
 */
public interface BaiVietRepository extends MongoRepository<BaiViet, String> {
    @Query(value = "{$or:[{'tieuDe': { $regex: ?0, $options: 'i' }}, {'tieuDeEn': { $regex: ?0, $options: 'i' }}], 'trangThai': true}", sort = "{'trangThai': -1, 'ngayDang': -1}")
    Page<BaiViet>getAllBaiVietActivePaging(String search, Pageable pageable);

    @Query(value = "{$or:[{'tieuDe': { $regex: ?0, $options: 'i' }}, {'tieuDeEn': { $regex: ?0, $options: 'i' }}]}", sort = "{'trangThai': -1, 'tieuDe': 1, 'ngayDang': -1}")
    Page<BaiViet>getAllBaiVietPaging(String search, Pageable pageable);

    @Query(value = "{$or:[{'tieuDe': { $regex: ?0, $options: 'i' }}, {'tieuDeEn': { $regex: ?0, $options: 'i' }}], 'trangThai': true, 'chuyenMucBaiViet._id': ?1}", sort = "{'trangThai': -1, 'tieuDe': 1}")
    Page<BaiViet>getAllBaiVietActiveByChuyenMucBaiVietPaging(String search, String chuyenMucBaiVietId,Pageable pageable);

    @Query(value = "{$or:[{'tieuDe': { $regex: ?0, $options: 'i' }}, {'tieuDeEn': { $regex: ?0, $options: 'i' }}], 'chuyenMucBaiViet._id': ?1}", sort = "{'trangThai': -1, 'tieuDe': 1}")
    Page<BaiViet>getAllBaiVietByChuyenMucBaiVietPaging(String search, String chuyenMucBaiVietId,Pageable pageable);
}
