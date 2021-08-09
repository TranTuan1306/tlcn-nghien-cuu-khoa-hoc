package com.stc.nghiencuukhoahoc.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 1/8/2021
 * Time: 10:21 AM
 * Filename: ChuyenMucBaiViet
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("chuyen-muc-bai-viet")
public class ChuyenMucBaiViet {
    @Id
    private String id;

    private String maChuyenMuc;

    private String tenChuyenMuc;

    private String tenChuyenMucEn;

    private boolean trangThai;
}
