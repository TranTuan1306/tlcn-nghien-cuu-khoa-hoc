package com.stc.nghiencuukhoahoc.services.loaihinhnghiencuu;

import com.stc.nghiencuukhoahoc.dtos.loaihinhnghiencuu.LoaiHinhNghienCuuDto;
import com.stc.nghiencuukhoahoc.entities.LoaiHinhNghienCuu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface LoaiHinhNghienCuuService {
    List<LoaiHinhNghienCuu> getAllActive();

    Page<LoaiHinhNghienCuu> getPaging(String search, Pageable pageable);

    LoaiHinhNghienCuu addNew(LoaiHinhNghienCuuDto dto);

    LoaiHinhNghienCuu update(String loaiHinhNghienCuuId, LoaiHinhNghienCuuDto dto);

    LoaiHinhNghienCuu changeStatus(String loaiHinhNghienCuuId);

    LoaiHinhNghienCuu getLoaiHinhNghienCuu(String loaiHinhNghienCuuId);

    LoaiHinhNghienCuu getLoaiHinhNghienCuuCore(String loaiHinhNghienCuuId);
}
