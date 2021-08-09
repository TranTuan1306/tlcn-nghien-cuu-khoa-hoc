package com.stc.nghiencuukhoahoc.services.thongbao;

import com.stc.nghiencuukhoahoc.dtos.thongbao.ThongBaoDto;
import com.stc.nghiencuukhoahoc.entities.ThongBao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * Created by: IntelliJ IDEA
 * User: vlong
 * Date: 7/3/2021
 * Time: 10:24 AM
 * Filename: ThongBaoService
 */
public interface ThongBaoService {
    Page<ThongBao> getAllThongBaoPaging(String search, Pageable pageable);
    List<ThongBao> changeTrangThaiThongBao(List<String> thongBaoIds);
    ThongBao createThongBao(ThongBaoDto dto);
    ThongBao getThongBao(String thongBaoId);
}
