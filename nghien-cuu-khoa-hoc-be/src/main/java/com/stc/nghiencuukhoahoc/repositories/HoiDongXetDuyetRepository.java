package com.stc.nghiencuukhoahoc.repositories;

import com.stc.nghiencuukhoahoc.entities.HoiDongXetDuyet;
import com.stc.nghiencuukhoahoc.entities.danhmuc.HocHam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 4/13/2021
 * Time: 11:36 AM
 * Filename: HoiDongXetDuyetRepository
 */
public interface HoiDongXetDuyetRepository extends MongoRepository<HoiDongXetDuyet, String> {
    @Query(value = "{'tenHoiDong' : { $regex: ?0, $options: 'i' }}"
            ,sort = "{'tenHoiDong': 1}")
    Page<HoiDongXetDuyet> getAllHoiDongXetDuyetsPaging(String search, Pageable pageable);

    @Query(value="{ 'thoiGianQuyTrinhId' : ?0}", fields="{'deTaiIds' : 1, '_id' : 0}")
    List<HoiDongXetDuyet> getListDeTaiCoHoiDongXetDuyetTheoThoiGianQuyTrinh(String thoiGianQuyTrinhId);
}
