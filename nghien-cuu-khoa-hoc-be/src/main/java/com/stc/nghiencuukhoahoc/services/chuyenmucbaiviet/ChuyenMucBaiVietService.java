package com.stc.nghiencuukhoahoc.services.chuyenmucbaiviet;

import com.stc.nghiencuukhoahoc.dtos.ChuyenMucBaiVietDto;
import com.stc.nghiencuukhoahoc.entities.ChuyenMucBaiViet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Created by IntelliJ IDEA.
 * User: vlong
 * Date: 27/05/2021
 * Time: 10:22 PM
 * Filename: ChuyenMucBaiVietService
 */

public interface ChuyenMucBaiVietService {
    Page<ChuyenMucBaiViet>getChuyenMucBaiVietPaging(String search, Pageable pageable);
    ChuyenMucBaiViet addChuyenMucBaiViet(ChuyenMucBaiVietDto chuyenMucBaiVietDto);
    ChuyenMucBaiViet updateChuyenMucBaiViet(String chuyenMucId, ChuyenMucBaiVietDto chuyenMucBaiVietDto);
    ChuyenMucBaiViet changeStatusChuyenMucBaiViet(String chuyenMucId);
    ChuyenMucBaiViet getChuyenMucBaiViet(String chuyenMucId);
    Page<ChuyenMucBaiViet> getChuyenMucBaiVietActive(String search, Pageable pageable);
}
