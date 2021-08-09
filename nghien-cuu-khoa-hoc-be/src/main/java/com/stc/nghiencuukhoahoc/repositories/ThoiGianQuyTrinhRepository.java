package com.stc.nghiencuukhoahoc.repositories;

import com.stc.nghiencuukhoahoc.entities.ThoiGianQuyTrinh;
import com.stc.nghiencuukhoahoc.entities.danhmuc.LinhVuc;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 3/10/2021
 * Time: 11:03 AM
 * Filename: ThoiGianQuyTrinhRepository
 */
public interface ThoiGianQuyTrinhRepository extends MongoRepository<ThoiGianQuyTrinh,String> {
    List<ThoiGianQuyTrinh> findAllByTrangThaiIsTrue();

    @Query(value = "{'namHoc' : { $regex: ?0, $options: 'i' }}"
            ,sort = "{'trangThai': -1, 'namHoc': 1}")
    Page<ThoiGianQuyTrinh> getAllThoiGianQuyTrinhsPaging(String search, Pageable pageable);

    Optional<ThoiGianQuyTrinh> findByIdAndTrangThaiIsTrue(String thoiGianQuyTrinhId);
}
