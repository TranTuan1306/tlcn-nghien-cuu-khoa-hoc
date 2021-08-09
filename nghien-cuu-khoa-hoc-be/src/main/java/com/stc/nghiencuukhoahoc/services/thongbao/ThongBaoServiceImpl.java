package com.stc.nghiencuukhoahoc.services.thongbao;

import com.stc.nghiencuukhoahoc.dtos.thongbao.ThongBaoDto;
import com.stc.nghiencuukhoahoc.entities.ThongBao;
import com.stc.nghiencuukhoahoc.exceptions.InvalidException;
import com.stc.nghiencuukhoahoc.exceptions.NotFoundException;
import com.stc.nghiencuukhoahoc.repositories.ThongBaoRepository;
import com.stc.nghiencuukhoahoc.utils.EnumTrangThaiThongBao;
import com.stc.vietnamstringutils.VietnameseStringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by: IntelliJ IDEA
 * User: vlong
 * Date: 7/3/2021
 * Time: 10:35 AM
 * Filename: ThongBaoServiceImpl
 */
@Service
@Slf4j
public class ThongBaoServiceImpl implements ThongBaoService {
    private final ThongBaoRepository thongBaoRepository;
    private final VietnameseStringUtils vietnameseStringUtils;
    public ThongBaoServiceImpl(ThongBaoRepository thongBaoRepository, VietnameseStringUtils vietnameseStringUtils) {
        this.thongBaoRepository = thongBaoRepository;
        this.vietnameseStringUtils = vietnameseStringUtils;
    }

    @Override
    public Page<ThongBao> getAllThongBaoPaging(String search, Pageable pageable) {
        return thongBaoRepository.getAllThongBaoPaging(vietnameseStringUtils.makeSearchRegex(search), pageable);
    }

    @Override
    public List<ThongBao> changeTrangThaiThongBao(List<String> thongBaoIds) {
        List<ThongBao> thongBaos = new ArrayList<>();
        for(String thongBaoId : thongBaoIds){
            ThongBao thongBao = getThongBao(thongBaoId);
            thongBao.setTrangThai(EnumTrangThaiThongBao.DA_XEM.name());
            thongBaoRepository.save(thongBao);
            thongBaos.add(thongBao);
        }
        return thongBaos;
    }

    @Override
    public ThongBao createThongBao(ThongBaoDto dto) {
        if(ObjectUtils.isEmpty(dto.getTenThongBao())){
            throw new InvalidException("Tên thông báo không bỏ trống");
        }
        if(ObjectUtils.isEmpty(dto.getTenThongBaoEn())){
            throw new InvalidException("Tên thông báo tiếng anh không bỏ trống");
        }
        if(ObjectUtils.isEmpty(dto.getDeTaiId())){
            throw new InvalidException("Tên đề tài không bỏ trống");
        }
        ThongBao thongBao = new ThongBao();
        thongBao.setTenThongBao(dto.getTenThongBao());
        thongBao.setTenThongBaoEn(dto.getTenThongBaoEn());
        thongBao.setDeTaiId(dto.getDeTaiId());
        thongBao.setTrangThai(EnumTrangThaiThongBao.CHUA_XEM.name());
        thongBaoRepository.save(thongBao);
        return thongBao;
    }

    @Override
    public ThongBao getThongBao(String thongBaoId) {
        return thongBaoRepository.findById(thongBaoId)
                .orElseThrow(() -> new NotFoundException(String.format("Không tồn tại thông báo với id: %s", thongBaoId)));
    }
}
