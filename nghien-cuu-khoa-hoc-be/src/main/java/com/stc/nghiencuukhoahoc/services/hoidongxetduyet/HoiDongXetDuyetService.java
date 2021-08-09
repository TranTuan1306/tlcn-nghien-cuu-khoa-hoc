package com.stc.nghiencuukhoahoc.services.hoidongxetduyet;

import com.stc.nghiencuukhoahoc.dtos.hocham.HocHamDto;
import com.stc.nghiencuukhoahoc.dtos.hoidongxetduyet.HoiDongXetDuyetDto;
import com.stc.nghiencuukhoahoc.entities.HoiDongXetDuyet;
import com.stc.nghiencuukhoahoc.entities.danhmuc.HocHam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.File;
import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 4/13/2021
 * Time: 11:34 AM
 * Filename: HoiDongXetDuyetService
 */
public interface HoiDongXetDuyetService {
    List<HoiDongXetDuyet> getAll();

    Page<HoiDongXetDuyet> getPaging(String search, Pageable pageable);

    HoiDongXetDuyet addNew(HoiDongXetDuyetDto dto);

    HoiDongXetDuyet update(String hoiDongXetDuyetId, HoiDongXetDuyetDto dto);

    HoiDongXetDuyet getHoiDongXetDuyet(String hoiDongXetDuyetId);

    File xuatPhieuDanhGiaThuyetMinh(String deTaiId, String hoiDongXetDuyetId) throws Exception;


}
