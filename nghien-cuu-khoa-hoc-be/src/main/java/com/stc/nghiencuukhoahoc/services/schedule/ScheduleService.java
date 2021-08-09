package com.stc.nghiencuukhoahoc.services.schedule;

import com.stc.nghiencuukhoahoc.entities.DeTai;
import com.stc.nghiencuukhoahoc.services.detai.DeTaiService;
import com.stc.nghiencuukhoahoc.utils.EnumTrangThaiDeTai;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 5/5/2021
 * Time: 9:05 AM
 * Filename: ScheduleService
 */
@Component
public class ScheduleService {
    private final DeTaiService deTaiService;

    public ScheduleService(DeTaiService deTaiService) {
        this.deTaiService = deTaiService;
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void huyDeTaiKhongNopBM05(){
        List<DeTai> deTais = deTaiService.getAll();
        for (DeTai deTai: deTais) {
            if(deTai.getThoiGianQuyTrinh().getKetThucKyHopDong().before(new Date()) && deTai.getFileKyHopDongs().size()<0){
                deTai.setTrangThaiDeTai(EnumTrangThaiDeTai.HUY.name());
            }
        }
    }
}
