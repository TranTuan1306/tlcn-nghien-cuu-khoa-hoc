package com.stc.nghiencuukhoahoc.entities.embeded;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 3/11/20
 * Time      : 9:38 AM
 * Filename  : DonViPhoiHop
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DonViPhoiHop {
    private String tenDonVi;

    private String noiDungPhoiHop;

    // Họ tên người đại diện
    private String daiDienDonVi;
}
