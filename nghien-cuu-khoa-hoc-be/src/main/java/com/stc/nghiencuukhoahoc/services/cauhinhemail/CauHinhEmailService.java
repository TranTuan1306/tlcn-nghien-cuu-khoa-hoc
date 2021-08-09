package com.stc.nghiencuukhoahoc.services.cauhinhemail;

import com.stc.nghiencuukhoahoc.dtos.CauHinhEmailDto;
import com.stc.nghiencuukhoahoc.entities.CauHinhEmail;
import org.springframework.data.domain.Page;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 4/28/2021
 * Time: 3:16 PM
 * Filename: CauHinhEmailController
 */
public interface CauHinhEmailService {
    CauHinhEmail getCauHinhCore();

    Page<CauHinhEmail> getAllCauHinhPaging(int page, int size, String sort, String column);

    CauHinhEmail create(CauHinhEmailDto dto);

    CauHinhEmail update(String id, CauHinhEmailDto dto);

    CauHinhEmail getById(String id);

}
