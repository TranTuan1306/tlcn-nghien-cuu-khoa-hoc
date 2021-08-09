package com.stc.nghiencuukhoahoc.repositories;

import com.stc.nghiencuukhoahoc.entities.HoiDongNghiemThu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

/**
 * Created by: IntelliJ IDEA
 * User: vlong
 * Date: 19/5/2021
 * Time: 10:24 AM
 * Filename: HoiDongNghiemThuRepository
 */
public interface HoiDongNghiemThuRepository extends MongoRepository<HoiDongNghiemThu, String> {
    HoiDongNghiemThu findByDeTai_Id(String deTaiId);
}
