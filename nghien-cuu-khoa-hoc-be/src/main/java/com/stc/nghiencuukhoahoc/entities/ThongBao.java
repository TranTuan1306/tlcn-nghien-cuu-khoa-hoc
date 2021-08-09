package com.stc.nghiencuukhoahoc.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/**
 * Created by IntelliJ IDEA.
 * User: vlong
 * Date: 7/3/2021
 * Time: 11:08 PM
 * Filename: ThongBao
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("thong-bao")
public class ThongBao {
    @Id
    private String id;
    private String tenThongBao;
    private String tenThongBaoEn;
    private String trangThai;
    private String deTaiId;
    private Date ngayThongBao = new Date();
}
