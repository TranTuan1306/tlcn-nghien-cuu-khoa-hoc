package com.stc.nghiencuukhoahoc.services.linhvuc;

import com.stc.nghiencuukhoahoc.dtos.linhvuc.LinhVucDto;
import com.stc.nghiencuukhoahoc.entities.danhmuc.LinhVuc;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface LinhVucService {
    List<LinhVuc> getAllActive();

    Page<LinhVuc> getPaging(String search, Pageable pageable);

    LinhVuc addNew(LinhVucDto dto);

    LinhVuc update(String linhVucId, LinhVucDto dto);

    LinhVuc changeStatus(String linhVucId);

    LinhVuc getLinhVuc(String linhVucId);

    LinhVuc getLinhVucCore(String linhVucId);
}
