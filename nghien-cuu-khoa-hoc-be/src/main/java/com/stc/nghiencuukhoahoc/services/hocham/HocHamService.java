package com.stc.nghiencuukhoahoc.services.hocham;

import com.stc.nghiencuukhoahoc.dtos.hocham.HocHamDto;
import com.stc.nghiencuukhoahoc.entities.danhmuc.HocHam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface HocHamService {
    List<HocHam> getAllHocHamActive();

    Page<HocHam> getPaging(String search, Pageable pageable);

    HocHam addNew(HocHamDto dto);

    HocHam update(String hocHamId, HocHamDto dto);

    HocHam changeStatus(String hocHamId);

    HocHam getHocHam(String hocHamId);

    HocHam getHocHamByTen(String ten);

    HocHam getHocHamCore(String hocHamId);
}
