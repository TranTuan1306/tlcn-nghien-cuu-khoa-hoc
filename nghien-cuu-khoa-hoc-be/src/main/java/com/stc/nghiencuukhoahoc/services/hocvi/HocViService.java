package com.stc.nghiencuukhoahoc.services.hocvi;

import com.stc.nghiencuukhoahoc.dtos.hocvi.HocViDto;
import com.stc.nghiencuukhoahoc.entities.danhmuc.HocVi;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface HocViService {
    List<HocVi> getAllActive();

    Page<HocVi> getPaging(String search, Pageable pageable);

    HocVi addNew(HocViDto dto);

    HocVi update(String hocViId, HocViDto dto);

    HocVi changeStatus(String hocViId);

    HocVi getHocVi(String hocViId);

    HocVi getHocViByTenHocVi(String ten);

    HocVi getHocViCore(String hocViId);
}
