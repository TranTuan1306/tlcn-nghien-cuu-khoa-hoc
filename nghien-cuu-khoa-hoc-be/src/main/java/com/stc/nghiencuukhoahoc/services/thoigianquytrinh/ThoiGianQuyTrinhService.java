package com.stc.nghiencuukhoahoc.services.thoigianquytrinh;

import com.stc.nghiencuukhoahoc.dtos.ThoiGianQuyTrinhDto;
import com.stc.nghiencuukhoahoc.entities.ThoiGianQuyTrinh;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 3/10/2021
 * Time: 10:59 AM
 * Filename: ThoiGianQuyTrinhService
 */
public interface ThoiGianQuyTrinhService {
    List<ThoiGianQuyTrinh> getListActive();

    Page<ThoiGianQuyTrinh> getPaging(String search, Pageable pageable);

    ThoiGianQuyTrinh addNew(ThoiGianQuyTrinhDto dto);

    ThoiGianQuyTrinh update(String thoiGianQuyTrinhId, ThoiGianQuyTrinhDto dto);

    ThoiGianQuyTrinh changeStatus(String thoiGianQuyTrinhId);

    ThoiGianQuyTrinh getThoiGianQuyTrinh(String thoiGianQuyTrinhId);
}
