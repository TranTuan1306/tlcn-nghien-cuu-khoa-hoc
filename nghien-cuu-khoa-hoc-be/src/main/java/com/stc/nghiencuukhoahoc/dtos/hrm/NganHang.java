package com.stc.nghiencuukhoahoc.dtos.hrm;

import lombok.Getter;
import lombok.Setter;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 5/4/2021
 * Time: 2:40 PM
 * Filename: NganHang
 */
@Getter
@Setter

public class NganHang {
    private String id;

    private String tenNganHang; //Tên Ngân Hàng hoặc Tên Chi Nhánh

    private String tenVietTat;
}
