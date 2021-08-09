package com.stc.nghiencuukhoahoc.services.banner;

import com.stc.nghiencuukhoahoc.dtos.BannerDto;
import com.stc.nghiencuukhoahoc.entities.danhmuc.Banner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Created by IntelliJ IDEA.
 * User: vlong
 * Date: 7/9/2021
 * Time: 04:50 PM
 * Filename: BannerService
 */
public interface BannerService {
    Banner createBanner(BannerDto dto);
    Banner getBanner(String bannerId);
    Banner updateBanner(String bannerId, BannerDto dto);
    String deleteBanner(String bannerId);
    Banner changeStatus(String bannerId);
    Page<Banner> getAllBannerPaging(String search, Pageable pageable);
    Page<Banner> getAllBannerActive(String search, Pageable pageable);
}
