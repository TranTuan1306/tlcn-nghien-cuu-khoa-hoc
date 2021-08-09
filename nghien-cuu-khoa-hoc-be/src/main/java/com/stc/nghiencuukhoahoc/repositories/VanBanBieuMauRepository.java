package com.stc.nghiencuukhoahoc.repositories;

import com.stc.nghiencuukhoahoc.entities.VanBanBieuMau;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

/**
 * Created by IntelliJ IDEA.
 * User: vlong
 * Date: 7/6/2021
 * Time: 05:27 PM
 * Filename: VanBanBieuMauRepository
 */
public interface VanBanBieuMauRepository extends MongoRepository<VanBanBieuMau, String> {

    @Query(value = "{$or:[{'tieuDe': { $regex: ?0, $options: 'i' }}, {'tieuDeEn': { $regex: ?0, $options: 'i' }}, {'loai': { $regex: ?0, $options: 'i' }}], 'trangThai': true}", sort = "{'tieuDe': 1}")
    Page<VanBanBieuMau>getAllBaiVietActivePaging(String search, Pageable pageable);

    @Query(value = "{$or:[{'tieuDe': { $regex: ?0, $options: 'i' }}, {'tieuDeEn': { $regex: ?0, $options: 'i' }}, {'loai': { $regex: ?0, $options: 'i' }}]}", sort = "{'trangThai': -1, 'tieuDe': 1}")
    Page<VanBanBieuMau>getAllBaiVietPaging(String search, Pageable pageable);
}
