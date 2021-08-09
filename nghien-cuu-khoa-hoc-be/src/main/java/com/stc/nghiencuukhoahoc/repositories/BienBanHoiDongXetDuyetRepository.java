package com.stc.nghiencuukhoahoc.repositories;

import com.stc.nghiencuukhoahoc.entities.BienBanHoiDongXetDuyet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 4/23/2021
 * Time: 8:50 AM
 * Filename: BienBanHoiDongXetDuyetRepository
 */
public interface BienBanHoiDongXetDuyetRepository extends MongoRepository<BienBanHoiDongXetDuyet, String> {


//    boolean existsByDeTaiIdAndHoiDongId(String deTaiId, String hoiDongId);
    boolean existsByDeTai_IdAndHoiDongXetDuyet_Id(String hoiDongId, String deTaiId);

    BienBanHoiDongXetDuyet findByDeTai_Id(String deTaiId);

}
