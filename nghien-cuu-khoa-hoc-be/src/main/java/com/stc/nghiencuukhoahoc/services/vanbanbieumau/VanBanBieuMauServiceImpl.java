package com.stc.nghiencuukhoahoc.services.vanbanbieumau;

import com.stc.nghiencuukhoahoc.dtos.vanbanbieumau.VanBanBieuMauDto;
import com.stc.nghiencuukhoahoc.entities.MyFile;
import com.stc.nghiencuukhoahoc.entities.VanBanBieuMau;
import com.stc.nghiencuukhoahoc.exceptions.InvalidException;
import com.stc.nghiencuukhoahoc.exceptions.NotFoundException;
import com.stc.nghiencuukhoahoc.repositories.VanBanBieuMauRepository;
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
 * Date: 6/7/2021
 * Time: 11:34 PM
 * Filename: VanBanBieuMauServiceImpl
 */
@Service
@Slf4j
public class VanBanBieuMauServiceImpl implements VanBanBieuMauService{
    private final VanBanBieuMauRepository vanBanBieuMauRepository;
    private final MyFileService myFileService;
    private final VietnameseStringUtils vietnameseStringUtils;
    public VanBanBieuMauServiceImpl(VanBanBieuMauRepository vanBanBieuMauRepository, MyFileService myFileService, VietnameseStringUtils vietnameseStringUtils) {
        this.vanBanBieuMauRepository = vanBanBieuMauRepository;
        this.myFileService = myFileService;
        this.vietnameseStringUtils = vietnameseStringUtils;
    }

    @Override
    public VanBanBieuMau createVanBanBieuMau(VanBanBieuMauDto dto) {
        if(ObjectUtils.isEmpty(dto.getLoai())){
            throw new InvalidException("Loại không để trống");
        }
        if(ObjectUtils.isEmpty(dto.getTieuDe())){
            throw new InvalidException("Tiêu đề không để trống");
        }
        if(ObjectUtils.isEmpty(dto.getTieuDeEn())){
            throw new InvalidException("Tiêu đề tiếng anh không để trống");
        }
        if(ObjectUtils.isEmpty(dto.getFileDinhKem())){
            throw new InvalidException("File đính kèm không để trống");
        }
        MyFile file = myFileService.getFileInfo(dto.getFileDinhKem());
        VanBanBieuMau vanBanBieuMau = new VanBanBieuMau();
        vanBanBieuMau.setLoai(dto.getLoai());
        vanBanBieuMau.setTieuDe(dto.getTieuDe());
        vanBanBieuMau.setTieuDeEn(dto.getTieuDeEn());
        vanBanBieuMau.setFileDinhKem(dto.getFileDinhKem());
        vanBanBieuMau.setTrangThai(true);
        vanBanBieuMauRepository.save(vanBanBieuMau);
        return vanBanBieuMau;
    }

    @Override
    public VanBanBieuMau updateVanBanBieuMau(String vanBanBieuMauId, VanBanBieuMauDto dto) {
        if(ObjectUtils.isEmpty(dto.getLoai())){
            throw new InvalidException("Loại không để trống");
        }
        if(ObjectUtils.isEmpty(dto.getTieuDe())){
            throw new InvalidException("Tiêu đề không để trống");
        }
        if(ObjectUtils.isEmpty(dto.getTieuDeEn())){
            throw new InvalidException("Tiêu đề tiếng anh không để trống");
        }
        if(ObjectUtils.isEmpty(dto.getFileDinhKem())){
            throw new InvalidException("File đính kèm không để trống");
        }
        MyFile file = myFileService.getFileInfo(dto.getFileDinhKem());
        VanBanBieuMau vanBanBieuMau = getVanBanBieuMau(vanBanBieuMauId);
        vanBanBieuMau.setLoai(dto.getLoai());
        vanBanBieuMau.setTieuDe(dto.getTieuDe());
        vanBanBieuMau.setTieuDeEn(dto.getTieuDeEn());
        vanBanBieuMau.setFileDinhKem(dto.getFileDinhKem());
        vanBanBieuMauRepository.save(vanBanBieuMau);
        return vanBanBieuMau;
    }

    @Override
    public VanBanBieuMau changeStatus(String vanBanBieuMauId) {
        VanBanBieuMau vanBanBieuMau = getVanBanBieuMau(vanBanBieuMauId);
        vanBanBieuMau.setTrangThai(!vanBanBieuMau.isTrangThai());
        vanBanBieuMauRepository.save(vanBanBieuMau);
        return vanBanBieuMau;
    }

    @Override
    public VanBanBieuMau getVanBanBieuMau(String vanBanBieuMauId) {
        return vanBanBieuMauRepository.findById(vanBanBieuMauId)
                .orElseThrow(() -> new NotFoundException(String.format("Không tồn tại văn bản biểu mẫu với id: %s", vanBanBieuMauId)));
    }

    @Override
    public Page<VanBanBieuMau> getAllVanBanBieuMauPaging(String search, Pageable pageable) {
        return vanBanBieuMauRepository.getAllBaiVietPaging(vietnameseStringUtils.makeSearchRegex(search), pageable);
    }

    @Override
    public Page<VanBanBieuMau> getAllVanBanBieuMauActivePaging(String search, Pageable pageable) {
        return vanBanBieuMauRepository.getAllBaiVietActivePaging(vietnameseStringUtils.makeSearchRegex(search), pageable);
    }


}
