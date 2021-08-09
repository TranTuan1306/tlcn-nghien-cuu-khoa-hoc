package com.stc.nghiencuukhoahoc.configs;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

/**
 * Created by Intellij IDEA.
 * User: Tín Nguyễn.
 * Date: 2019-11-04.
 * Time: 01:40.
 * Filename: FileStorageProperties.
 */
@Getter
@Setter
@Configuration
public class FileStorageProperties {

    @Value("${file.download_dir}")
    private String downloadDir;

    @Value("${file.upload_dir}")
    private String uploadDir;
}

