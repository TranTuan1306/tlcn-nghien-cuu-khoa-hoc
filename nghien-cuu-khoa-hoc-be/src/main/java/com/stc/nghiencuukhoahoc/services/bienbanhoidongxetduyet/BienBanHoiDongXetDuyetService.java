package com.stc.nghiencuukhoahoc.services.bienbanhoidongxetduyet;

import com.stc.nghiencuukhoahoc.dtos.hoidongxetduyet.BienBanHoiDongXetDuyetDto;
import com.stc.nghiencuukhoahoc.dtos.hoidongxetduyet.PhieuDiemThanhVienHoiDongXetDuyetDto;
import com.stc.nghiencuukhoahoc.entities.BienBanHoiDongXetDuyet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.File;
import java.util.List;
import java.util.Optional;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 4/23/2021
 * Time: 8:51 AM
 * Filename: BienBanHoiDongXetDuyetService
 */
public interface BienBanHoiDongXetDuyetService {
    List<BienBanHoiDongXetDuyet> getAll();

    BienBanHoiDongXetDuyet addNew(String deTaiId, String hoiDongId);

    BienBanHoiDongXetDuyet update(String bienBanHoiDongXetDuyetId, BienBanHoiDongXetDuyetDto dto);

    BienBanHoiDongXetDuyet uploadDanhGiaCuaHoiDongXetDuyetByBienBanHoiDong(String bienBanHoiDongXetDuyetId, PhieuDiemThanhVienHoiDongXetDuyetDto phieuDiemThanhVienHoiDongXetDuyetDto);

    BienBanHoiDongXetDuyet getBienBanHoiDongXetDuyet(String bienBanHoiDongXetDuyetId);

    File xuatBienBanHopHoiDongTuyenChon(String bienBanHoiDongXetDuyetId) throws Exception;

    Page<BienBanHoiDongXetDuyet> getBienBanHoiDongByHoiDongXetDuyet(String search, String hoiDongId, Pageable pageable);

    BienBanHoiDongXetDuyet getBienBanHoiDongByDeTai(String deTaiId);

}
