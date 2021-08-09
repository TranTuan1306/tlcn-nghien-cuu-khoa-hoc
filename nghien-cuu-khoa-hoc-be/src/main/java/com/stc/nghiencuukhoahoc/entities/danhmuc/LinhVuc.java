package com.stc.nghiencuukhoahoc.entities.danhmuc;

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
 * Date      : 3/2/20
 * Time      : 7:23 AM
 * Filename  : LinhVuc
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("linh-vuc")
public class LinhVuc {
    @Id
    private String id;

    private int thuTu;

    @NotNull
    private String maLinhVuc;

    @Indexed(unique = true)
    private String tenLinhVuc;

    private String tenLinhVucEn;

    private boolean trangThai = true;
}
