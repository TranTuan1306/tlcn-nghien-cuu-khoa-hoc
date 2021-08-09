package com.stc.nghiencuukhoahoc.repositories;

import com.stc.nghiencuukhoahoc.entities.DeTai;
import com.stc.nghiencuukhoahoc.entities.danhmuc.HocHam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.security.core.parameters.P;

import java.util.List;
import java.util.Optional;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 4/27/20
 * Time      : 11:31 AM
 * Filename  : DeTaiNghienCuuKhoaHocRepository
 */
public interface DeTaiRepository extends MongoRepository<DeTai, String> {
    @Query(value = "{$or:[{ 'tenDeTai' : { $regex: ?0, $options: 'i' }}, { 'tenDeTaiEn' : { $regex: ?0, $options: 'i' }},{ 'maSo' : { $regex: ?0, $options: 'i' }}]}"
            , sort = "{'trangThaiDeTai': -1, 'tenDeTai': 1}")
    Page<DeTai> getAllDeTaisPaging(String search, Pageable pageable);

    @Query(value = "{$or:[{ 'tenDeTai' : { $regex: ?0, $options: 'i' }}, { 'tenDeTaiEn' : { $regex: ?0, $options: 'i' }},{ 'maSo' : { $regex: ?0, $options: 'i' }}],'trangThaiDeTai' : ?1}"
            , sort = "{'trangThaiDeTai': -1, 'tenDeTai': 1}")
    Page<DeTai> getAllDeTaiByTrangThaiPaging(String search, String trangThaiDeTai, Pageable pageable);

    @Query(value = "{'chuNhiemDeTai.email' : ?0, 'thoiGianQuyTrinh._id': ?1, 'tenDeTai' : { $regex: ?2, $options: 'i' }, 'trangThaiDeTai' : {$in: ?3}}"
            , sort = "{'trangThaiDeTai': -1, 'tenDeTai': 1}")
    Page<DeTai> getDeTaisByEmailChuNhiemThoiGianQuyTrinh(String emailChuNhiem, String thoiGianQuyTrinhId, String tenDeTai, List<String> trangThaiDeTais, Pageable pageable);

    @Query(value = "{'chuNhiemDeTai.email' : ?0, 'thoiGianQuyTrinh._id': ?1, 'tenDeTai' : { $regex: ?2, $options: 'i' }}"
            , sort = "{'trangThaiDeTai': -1, 'tenDeTai': 1}")
    Page<DeTai> getDeTaisByEmailChuNhiemThoiGianQuyTrinhAll(String emailChuNhiem, String thoiGianQuyTrinhId, String tenDeTai, Pageable pageable);

    @Query(value = "{'tenDeTai': { $regex: ?0, $options: 'i' }, 'trangThaiDeTai': ?1 , 'thoiGianQuyTrinh._id': ?2, '_id':{$nin: ?3}}", sort = "{'tenDeTai': 1}")
    Page<DeTai> getDeTaiChuaCoHoiDongXetDuyetTheoThoiGianQuyTrinh(String search, String trangThaiDeTai ,String thoiGianQuyTrinh, List<String> deTaiCoHoiDongXetDuyetIds, Pageable pageable);

    @Query(value = "{$or:[{ 'tenDeTai' : { $regex: ?0, $options: 'i' }}, { 'tenDeTaiEn' : { $regex: ?0, $options: 'i' }},{ 'maSo' : { $regex: ?0, $options: 'i' }}], 'donViId': ?1, 'trangThaiDeTai' : ?2}", sort = "{'trangThaiDeTai': -1, 'tenDeTai': 1}")
    Page<DeTai> getByDonViIdAndTrangThaiDeTai(String search, String donViId, String trangThaiDeTai, Pageable pageable);

    @Query(value = "{$or:[{ 'tenDeTai' : { $regex: ?0, $options: 'i' }}, { 'tenDeTaiEn' : { $regex: ?0, $options: 'i' }},{ 'maSo' : { $regex: ?0, $options: 'i' }}], 'thoiGianQuyTrinh._id': ?1, 'trangThaiDeTai' : {$in: ?2} }", sort = "{'trangThaiDeTai': -1, 'tenDeTai': 1}")
    Page<DeTai>getDeTaiByThoiGianQuyTrinhAndTrangThaiDeTaiPaging(String search, String thoiGianQuyTrinhId, List<String> trangThaiDeTais, Pageable pageable);

    @Query(value = "{$or:[{ 'tenDeTai' : { $regex: ?0, $options: 'i' }}, { 'tenDeTaiEn' : { $regex: ?0, $options: 'i' }},{ 'maSo' : { $regex: ?0, $options: 'i' }}], '_id': {$in: ?1}}", sort = "{'trangThaiDeTai': -1, 'tenDeTai': 1}")
    Page<DeTai>getDeTaiByListId(String search, List<String>ids, Pageable pageable);
}
