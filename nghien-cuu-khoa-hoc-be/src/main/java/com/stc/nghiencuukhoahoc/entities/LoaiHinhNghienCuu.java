package com.stc.nghiencuukhoahoc.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 4/27/20
 * Time      : 11:56 AM
 * Filename  : LoaiHinhNghienCuu
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("loai-hinh-nghien-cuu")
public class LoaiHinhNghienCuu {
    @Id
    private String id;

    private int thuTu;

    @NotNull
    private String maLoaiHinh;

    @Indexed(unique = true)
    private String tenLoaiHinh;

    private String tenLoaiHinhEn;

    private boolean trangThai = true;
}
