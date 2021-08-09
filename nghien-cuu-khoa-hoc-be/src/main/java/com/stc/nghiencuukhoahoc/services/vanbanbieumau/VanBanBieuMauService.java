package com.stc.nghiencuukhoahoc.services.vanbanbieumau;

import com.stc.nghiencuukhoahoc.dtos.vanbanbieumau.VanBanBieuMauDto;
import com.stc.nghiencuukhoahoc.entities.VanBanBieuMau;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Created by IntelliJ IDEA.
 * User: vlong
 * Date: 6/7/2021
 * Time: 11:34 PM
 * Filename: VanBanBieuMauService
 */
public interface VanBanBieuMauService {
    VanBanBieuMau createVanBanBieuMau(VanBanBieuMauDto dto);
    VanBanBieuMau updateVanBanBieuMau(String vanBanBieuMauId, VanBanBieuMauDto dto);
    VanBanBieuMau changeStatus(String vanBanBieuMauId);
    VanBanBieuMau getVanBanBieuMau(String vanBanBieuMauId);
    Page<VanBanBieuMau> getAllVanBanBieuMauPaging(String search, Pageable pageable);
    Page<VanBanBieuMau> getAllVanBanBieuMauActivePaging(String search, Pageable pageable);
}
