package com.stc.nghiencuukhoahoc.configs.kafka.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by Intellij IDEA.
 * User: Tín Nguyễn.
 * Date: 2/21/20.
 * Time: 10:21.
 * Filename: FileDetails.
 */
@Getter
@Setter
@NoArgsConstructor
public class FileDetails {
    private byte[] file;
    private String fileName;
    private long fileSize;
}
