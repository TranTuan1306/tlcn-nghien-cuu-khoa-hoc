package com.stc.nghiencuukhoahoc.repositories;

import com.stc.nghiencuukhoahoc.entities.ThongBao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 7/2/2021
 * Time: 11:44 AM
 * Filename: ThongBaoRepository
 */
public interface ThongBaoRepository extends MongoRepository<ThongBao, String> {
    @Query(value = "{'tenThongBao': { $regex: ?0, $options: 'i' }}",
            sort = "{'trangThai': -1, 'ngayThongBao': 1}")
    Page<ThongBao> getAllThongBaoPaging(String search, Pageable pageable);
}
