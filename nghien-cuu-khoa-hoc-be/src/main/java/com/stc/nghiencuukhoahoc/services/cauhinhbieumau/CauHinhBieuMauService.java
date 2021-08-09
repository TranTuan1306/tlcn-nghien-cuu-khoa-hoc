package com.stc.nghiencuukhoahoc.services.cauhinhbieumau;

import com.stc.nghiencuukhoahoc.dtos.CauHinhBieuMauDto;
import com.stc.nghiencuukhoahoc.entities.CauHinhBieuMau;
import com.stc.nghiencuukhoahoc.entities.CauHinhEmail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 5/4/2021
 * Time: 4:31 PM
 * Filename: CauHinhBieuMauService
 */
public interface CauHinhBieuMauService {
    CauHinhBieuMau getCauHinhCore();

    CauHinhBieuMau create(CauHinhBieuMauDto dto);

    CauHinhBieuMau update(String id, CauHinhBieuMauDto dto);

    Page<CauHinhBieuMau> getAllCauHinhBieuMau(Pageable pageable);
}
