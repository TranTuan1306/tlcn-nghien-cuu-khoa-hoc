package com.stc.nghiencuukhoahoc.services.loaikinhphi;

import com.stc.nghiencuukhoahoc.dtos.LoaiKinhPhiDto;
import com.stc.nghiencuukhoahoc.entities.danhmuc.LoaiKinhPhi;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 3/10/2021
 * Time: 10:26 AM
 * Filename: LoaiKinhPhiService
 */
public interface LoaiKinhPhiService {
    List<LoaiKinhPhi> getAllLoaiKinhPhiByTrangThaiTrue();

    Page<LoaiKinhPhi> getPaging(String search, Pageable pageable);

    LoaiKinhPhi addNew(LoaiKinhPhiDto dto);

    LoaiKinhPhi update(String loaiKinhPhiId, LoaiKinhPhiDto dto);

    LoaiKinhPhi changeStatus(String loaiKinhPhiId);

    LoaiKinhPhi getLoaiKinhPhi(String loaiKinhPhiId);
}
