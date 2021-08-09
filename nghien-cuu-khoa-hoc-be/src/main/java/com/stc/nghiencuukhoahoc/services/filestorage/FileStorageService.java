package com.stc.nghiencuukhoahoc.services.filestorage;

import com.stc.nghiencuukhoahoc.dtos.FileStoreResult;
import org.springframework.core.io.Resource;

import java.io.File;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 5/26/2021
 * Time: 10:39 AM
 * Filename: FileStorageService
 */
public interface FileStorageService {
    FileStoreResult storeFile(File file, String subFolder);

    Resource loadFile(String location);
}
