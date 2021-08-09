package com.stc.nghiencuukhoahoc.services.baiviet;

import com.stc.nghiencuukhoahoc.clients.HrmServiceClient;
import com.stc.nghiencuukhoahoc.dtos.baiviet.BaiVietDto;
import com.stc.nghiencuukhoahoc.entities.MyFile;
import com.stc.nghiencuukhoahoc.entities.danhmuc.BaiViet;
import com.stc.nghiencuukhoahoc.exceptions.InvalidException;
import com.stc.nghiencuukhoahoc.exceptions.NotFoundException;
import com.stc.nghiencuukhoahoc.repositories.BaiVietRepository;
import com.stc.nghiencuukhoahoc.services.chuyenmucbaiviet.ChuyenMucBaiVietService;
import com.stc.nghiencuukhoahoc.services.fileservice.MyFileService;
import com.stc.vietnamstringutils.VietnameseStringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import org.springframework.data.domain.Pageable;

/**
 * Created by IntelliJ IDEA.
 * User: vlong
 * Date: 7/5/2021
 * Time: 11:56 AM
 * Filename: BaiVietServiceImpl
 */
@Service
@Slf4j
public class BaiVietServiceImpl implements BaiVietService{
    private final BaiVietRepository baiVietRepository;
    private final ChuyenMucBaiVietService chuyenMucBaiVietService;
    private final MyFileService myFileService;
    private final HrmServiceClient hrmServiceClient;
    private final VietnameseStringUtils vietnameseStringUtils;
    public BaiVietServiceImpl(BaiVietRepository baiVietRepository, ChuyenMucBaiVietService chuyenMucBaiVietService, MyFileService myFileService, HrmServiceClient hrmServiceClient, VietnameseStringUtils vietnameseStringUtils) {
        this.baiVietRepository = baiVietRepository;
        this.chuyenMucBaiVietService = chuyenMucBaiVietService;
        this.myFileService = myFileService;
        this.hrmServiceClient = hrmServiceClient;
        this.vietnameseStringUtils = vietnameseStringUtils;
    }

    @Override
    public BaiViet createBaiViet(String email, BaiVietDto dto) {
        if(ObjectUtils.isEmpty(dto.getChuyenMucBaiVietId())){
            throw new InvalidException("Chuyên mục bài viết không để trống");
        }
        if(ObjectUtils.isEmpty(dto.getNoiDung())){
            throw new InvalidException("Nội dung không để trống");
        }
        if(ObjectUtils.isEmpty(dto.getNoiDungEn())){
            throw new InvalidException("Nội dung tiếng anh không để trống");
        }
        if(ObjectUtils.isEmpty(dto.getTieuDe())){
            throw new InvalidException("Tiêu đề không để trống");
        }
        if(ObjectUtils.isEmpty(dto.getTieuDeEn())){
            throw new InvalidException("Tiêu đề tiếng anh không để trống");
        }
        if(ObjectUtils.isEmpty(dto.getFileAnhBia())){
            throw new InvalidException("File ảnh bìa không để trống");
        }
        MyFile file = myFileService.getFileInfo(dto.getFileAnhBia());
        BaiViet baiViet = new BaiViet();
        baiViet.setChuyenMucBaiViet(chuyenMucBaiVietService.getChuyenMucBaiViet(dto.getChuyenMucBaiVietId()));
        baiViet.setNoiDung(dto.getNoiDung());
        baiViet.setNoiDungEn(dto.getNoiDungEn());
        baiViet.setTieuDe(dto.getTieuDe());
        baiViet.setTieuDeEn(dto.getTieuDeEn());
        baiViet.setFileAnhBia(dto.getFileAnhBia());
        baiViet.setTrangThai(true);
        baiViet.setCreatedBy(hrmServiceClient.getNhanVienByEmail(email).getHoTen());
        baiVietRepository.save(baiViet);
        return baiViet;
    }

    @Override
    public BaiViet getBaiViet(String baiVietId) {
        return baiVietRepository.findById(baiVietId)
                .orElseThrow(() -> new NotFoundException(String.format("Không tìm thấy bài viết với id: %s", baiVietId)));
    }

    @Override
    public BaiViet updateBaiViet(String baiVietId, BaiVietDto dto) {
        BaiViet baiViet = getBaiViet(baiVietId);
        if(ObjectUtils.isEmpty(dto.getChuyenMucBaiVietId())){
            throw new InvalidException("Chuyên mục bài viết không để trống");
        }
        if(ObjectUtils.isEmpty(dto.getNoiDung())){
            throw new InvalidException("Nội dung không để trống");
        }
        if(ObjectUtils.isEmpty(dto.getNoiDungEn())){
            throw new InvalidException("Nội dung tiếng anh không để trống");
        }
        if(ObjectUtils.isEmpty(dto.getTieuDe())){
            throw new InvalidException("Tiêu đề không để trống");
        }
        if(ObjectUtils.isEmpty(dto.getTieuDeEn())){
            throw new InvalidException("Tiêu đề tiếng anh không để trống");
        }
        if(ObjectUtils.isEmpty(dto.getFileAnhBia())){
            throw new InvalidException("File ảnh bìa không để trống");
        }
        MyFile file = myFileService.getFileInfo(dto.getFileAnhBia());
        baiViet.setChuyenMucBaiViet(chuyenMucBaiVietService.getChuyenMucBaiViet(dto.getChuyenMucBaiVietId()));
        baiViet.setNoiDung(dto.getNoiDung());
        baiViet.setNoiDungEn(dto.getNoiDungEn());
        baiViet.setTieuDe(dto.getTieuDe());
        baiViet.setTieuDeEn(dto.getTieuDeEn());
        baiViet.setFileAnhBia(dto.getFileAnhBia());
        baiVietRepository.save(baiViet);
        return baiViet;
    }

    @Override
    public String deleteBaiViet(String baiVietId) {
        BaiViet baiViet = getBaiViet(baiVietId);
        baiVietRepository.delete(baiViet);
        String message = "Đã xóa thành công bài viết";
        return message;
    }

    @Override
    public BaiViet changeStatus(String baiVietId) {
        BaiViet baiViet = getBaiViet(baiVietId);
        baiViet.setTrangThai(!baiViet.isTrangThai());
        baiVietRepository.save(baiViet);
        return baiViet;
    }

    @Override
    public Page<BaiViet> getAllBaiVietPaging(String search, Pageable pageable) {
        return baiVietRepository.getAllBaiVietPaging(vietnameseStringUtils.makeSearchRegex(search), pageable);
    }

    @Override
    public Page<BaiViet> getAllBaiVietByChuyenMucBaiVietIdPaging(String search, String chuyenMucBaiVietId, Pageable pageable) {
        return baiVietRepository.getAllBaiVietByChuyenMucBaiVietPaging(vietnameseStringUtils.makeSearchRegex(search), chuyenMucBaiVietId, pageable);
    }

    @Override
    public Page<BaiViet> getAllBaiVietByChuyenMucBaiVietIdActivePaging(String search, String chuyenMucBaiVietId, Pageable pageable) {
        return baiVietRepository.getAllBaiVietActiveByChuyenMucBaiVietPaging(vietnameseStringUtils.makeSearchRegex(search), chuyenMucBaiVietId, pageable);
    }

    @Override
    public Page<BaiViet> getAllBaiVietActivePaging(String search, Pageable pageable) {
        return baiVietRepository.getAllBaiVietActivePaging(vietnameseStringUtils.makeSearchRegex(search), pageable);
    }
}
