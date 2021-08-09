package com.stc.nghiencuukhoahoc.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 5/4/2021
 * Time: 9:49 AM
 * Filename: File
 */
@Getter
@Setter
@NoArgsConstructor
@Document(collection = "file")
public class MyFile {
    @Id
    private String id;

    private String tenFile;

    private double fileSize;

    private Date ngayUpload = new Date();

    private String filePath;

    private String fileType;
}

