package com.stc.nghiencuukhoahoc.services.baiviet;

import com.stc.nghiencuukhoahoc.dtos.baiviet.BaiVietDto;
import com.stc.nghiencuukhoahoc.entities.danhmuc.BaiViet;
import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;

/**
 * Created by IntelliJ IDEA.
 * User: vlong
 * Date: 7/5/2021
 * Time: 11:51 AM
 * Filename: BaiVietService
 */
public interface BaiVietService {
    BaiViet createBaiViet(String email, BaiVietDto dto);
    BaiViet getBaiViet(String baiVietId);
    BaiViet updateBaiViet(String baiVietId, BaiVietDto dto);
    String deleteBaiViet(String baiVietId);
    BaiViet changeStatus(String baiVietId);
    Page<BaiViet>getAllBaiVietPaging(String search ,Pageable pageable);
    Page<BaiViet>getAllBaiVietByChuyenMucBaiVietIdPaging(String search, String chuyenMucBaiVietId, Pageable pageable);
    Page<BaiViet>getAllBaiVietByChuyenMucBaiVietIdActivePaging(String search, String chuyenMucBaiVietId, Pageable pageable);
    Page<BaiViet>getAllBaiVietActivePaging(String search, Pageable pageable);
}
