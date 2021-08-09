package com.stc.nghiencuukhoahoc.dtos.bienbanhoidongxetduyet;

import com.stc.nghiencuukhoahoc.dtos.Total;
import com.stc.nghiencuukhoahoc.entities.BienBanHoiDongXetDuyet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PageBienBanTransfer {
    private List<Total> total;

    private List<BienBanHoiDongXetDuyet> metaData;
}
