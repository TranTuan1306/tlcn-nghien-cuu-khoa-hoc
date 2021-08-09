package com.stc.nghiencuukhoahoc.entities.embeded;

import com.stc.nghiencuukhoahoc.entities.KinhPhi;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.DBRef;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 12/8/2020
 * Time: 10:47 AM
 * Filename: KinhPhiThucHien
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class KinhPhiThucHien {
    @DBRef
    private KinhPhi kinhPhi;

    private double kinhPhiTuNganSach;

    private double kinhPhiTuCacNguonKhac;

    private double tongKinhPhi;

    private String ghiChu;
}
