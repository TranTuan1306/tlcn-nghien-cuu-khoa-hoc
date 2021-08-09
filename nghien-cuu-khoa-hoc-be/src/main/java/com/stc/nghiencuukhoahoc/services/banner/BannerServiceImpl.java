package com.stc.nghiencuukhoahoc.services.banner;

import com.stc.nghiencuukhoahoc.dtos.BannerDto;
import com.stc.nghiencuukhoahoc.entities.MyFile;
import com.stc.nghiencuukhoahoc.entities.danhmuc.Banner;
import com.stc.nghiencuukhoahoc.exceptions.InvalidException;
import com.stc.nghiencuukhoahoc.exceptions.NotFoundException;
import com.stc.nghiencuukhoahoc.repositories.BannerRepository;
import com.stc.nghiencuukhoahoc.services.fileservice.MyFileService;
import com.stc.vietnamstringutils.VietnameseStringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

/**
 * Created by IntelliJ IDEA.
 * User: vlong
 * Date: 7/9/2021
 * Time: 04:50 PM
 * Filename: BannerService
 */
@Service
@Slf4j
public class BannerServiceImpl implements BannerService {
    private final BannerRepository bannerRepository;
    private final MyFileService myFileService;
    private final VietnameseStringUtils vietnameseStringUtils;

    public BannerServiceImpl(BannerRepository bannerRepository, MyFileService myFileService, VietnameseStringUtils vietnameseStringUtils) {
        this.bannerRepository = bannerRepository;
        this.myFileService = myFileService;
        this.vietnameseStringUtils = vietnameseStringUtils;
    }

    @Override
    public Banner createBanner(BannerDto dto) {
        if(ObjectUtils.isEmpty(dto.getThuTu())){
            throw new InvalidException("Thứ tự không để trống");
        }
        if(ObjectUtils.isEmpty(dto.getTieuDe())){
            throw new InvalidException("Tiêu đề không để trống");
        }
        if(ObjectUtils.isEmpty(dto.getTieuDeEn())){
            throw new InvalidException("Tiêu đề tiếng anh không để trống");
        }
        if(ObjectUtils.isEmpty(dto.getFileBanner())){
            throw new InvalidException("File banner không để trống");
        }
        if(ObjectUtils.isEmpty(dto.getLienKetNgoai())){
            throw new InvalidException("Liên kết ngoài không để trống");
        }
        MyFile file = myFileService.getFileInfo(dto.getFileBanner());
        Banner banner = new Banner();
        banner.setLienKetNgoai(dto.getLienKetNgoai());
        banner.setThuTu(dto.getThuTu());
        banner.setTieuDe(dto.getTieuDe());
        banner.setTieuDeEn(dto.getTieuDeEn());
        banner.setFileBanner(dto.getFileBanner());
        banner.setTrangThai(true);
        bannerRepository.save(banner);
        return banner;
    }

    @Override
    public Banner getBanner(String bannerId) {
        return bannerRepository.findById(bannerId)
                .orElseThrow(() -> new NotFoundException(String.format("Không tồn tại banner với id: %s", bannerId)));
    }

    @Override
    public Banner updateBanner(String bannerId, BannerDto dto) {
        if(ObjectUtils.isEmpty(dto.getThuTu())){
            throw new InvalidException("Thứ tự không để trống");
        }
        if(ObjectUtils.isEmpty(dto.getTieuDe())){
            throw new InvalidException("Tiêu đề không để trống");
        }
        if(ObjectUtils.isEmpty(dto.getTieuDeEn())){
            throw new InvalidException("Tiêu đề tiếng anh không để trống");
        }
        if(ObjectUtils.isEmpty(dto.getFileBanner())){
            throw new InvalidException("File banner không để trống");
        }
        if(ObjectUtils.isEmpty(dto.getLienKetNgoai())){
            throw new InvalidException("Liên kết ngoài không để trống");
        }
        MyFile file = myFileService.getFileInfo(dto.getFileBanner());
        Banner banner = getBanner(bannerId);
        banner.setLienKetNgoai(dto.getLienKetNgoai());
        banner.setThuTu(dto.getThuTu());
        banner.setTieuDe(dto.getTieuDe());
        banner.setTieuDeEn(dto.getTieuDeEn());
        banner.setFileBanner(dto.getFileBanner());
        bannerRepository.save(banner);
        return banner;
    }

    @Override
    public String deleteBanner(String bannerId) {
        Banner banner = getBanner(bannerId);
        bannerRepository.delete(banner);
        String message = "Đã xóa thành công banner";
        return message;
    }

    @Override
    public Banner changeStatus(String bannerId) {
        Banner banner = getBanner(bannerId);
        banner.setTrangThai(!banner.isTrangThai());
        bannerRepository.save(banner);
        return banner;
    }

    @Override
    public Page<Banner> getAllBannerPaging(String search, Pageable pageable) {
        return bannerRepository.getAllBannerPaging(vietnameseStringUtils.makeSearchRegex(search), pageable);
    }

    @Override
    public Page<Banner> getAllBannerActive(String search, Pageable pageable) {
        return bannerRepository.getAllBannerActivePaging(vietnameseStringUtils.makeSearchRegex(search), pageable);
    }
}
