package com.stc.nghiencuukhoahoc.services.fileservice;
import com.stc.nghiencuukhoahoc.entities.MyFile;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.security.Principal;


/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 08/12/2020
 * Time      : 14:44
 * Filename  : MyFileService
 */
public interface MyFileService {
    MyFile uploadFile(MultipartFile file, String subFolder) throws Exception;

    MyFile getFileInfo(String id);

    Resource viewFile(String id);

    File downloadFile(String id);
}
