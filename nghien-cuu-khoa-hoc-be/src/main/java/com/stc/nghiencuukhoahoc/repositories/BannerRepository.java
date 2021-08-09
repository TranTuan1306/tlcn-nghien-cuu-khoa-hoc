package com.stc.nghiencuukhoahoc.repositories;

import com.stc.nghiencuukhoahoc.entities.danhmuc.BaiViet;
import com.stc.nghiencuukhoahoc.entities.danhmuc.Banner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

/**
 * Created by IntelliJ IDEA.
 * User: vlong
 * Date: 7/6/2021
 * Time: 11:32 AM
 * Filename: BannerRepository
 */
public interface BannerRepository extends MongoRepository<Banner, String> {
    @Query(value = "{$or:[{'tieuDe': { $regex: ?0, $options: 'i' }}, {'tieuDeEn': { $regex: ?0, $options: 'i' }}]}", sort = "{'thuTu': 1, 'trangThai': 1}")
    Page<Banner> getAllBannerPaging(String search, Pageable pageable);
    @Query(value = "{$or:[{'tieuDe': { $regex: ?0, $options: 'i' }}, {'tieuDeEn': { $regex: ?0, $options: 'i' }}], 'trangThai': true}", sort = "{'thuTu': 1}")
    Page<Banner> getAllBannerActivePaging(String search, Pageable pageable);
}
