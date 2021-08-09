package com.stc.nghiencuukhoahoc.services.fileservice;

import com.stc.nghiencuukhoahoc.dtos.FileStoreResult;
import com.stc.nghiencuukhoahoc.entities.MyFile;
import com.stc.nghiencuukhoahoc.exceptions.InvalidException;
import com.stc.nghiencuukhoahoc.exceptions.NotFoundException;
import com.stc.nghiencuukhoahoc.repositories.MyFileRepository;
import com.stc.nghiencuukhoahoc.services.filestorage.FileStorageService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.Principal;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 08/12/2020
 * Time      : 14:46
 * Filename  : MyFileServiceImpl
 */
@Slf4j
@Service
public class MyFileServiceImpl implements MyFileService {

    private final MyFileRepository myFileRepository;

    private final FileStorageService fileStorageService;

    private final MessageSource messageSource;

    @Value("${file.download_dir}")
    private String download;

    private static final List<String> contentImageTypes = Arrays.asList(
            MediaType.IMAGE_GIF_VALUE,
            MediaType.IMAGE_JPEG_VALUE,
            MediaType.IMAGE_PNG_VALUE);

    public MyFileServiceImpl(MyFileRepository myFileRepository, FileStorageService fileStorageService, MessageSource messageSource) {
        this.myFileRepository = myFileRepository;
        this.fileStorageService = fileStorageService;
        this.messageSource = messageSource;
    }


    @Override
    public MyFile uploadFile(MultipartFile file, String subFolder) throws Exception {
        File temp = new File(Objects.requireNonNull(file.getOriginalFilename()));
        FileUtils.copyInputStreamToFile(file.getInputStream(), temp);
        FileStoreResult fileStoreResult = fileStorageService.storeFile(temp, subFolder);
        MyFile myFile = new MyFile();
        myFile.setTenFile(fileStoreResult.getTenFile());
        myFile.setFileSize(file.getSize());
        myFile.setFileType(file.getContentType());
        myFile.setFilePath(fileStoreResult.getDuongDan());
        myFileRepository.save(myFile);
        return myFile;
    }

    @Override
    public MyFile getFileInfo(String id) {
        Locale locale = LocaleContextHolder.getLocale();
        return myFileRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("Không tìm thấy file với id: %s", id)));
    }

    @Override
    public Resource viewFile(String id) {
        Locale locale = LocaleContextHolder.getLocale();
        MyFile myFile = getFileInfo(id);
        if (!contentImageTypes.contains(myFile.getFileType()) && !myFile.getFileType().equals(MediaType.APPLICATION_PDF_VALUE)) {
            throw new InvalidException("Loại file này không hỗ trợ");
        }
        return fileStorageService.loadFile(myFile.getFilePath());
    }

    @Override
    public File downloadFile(String id) {
        MyFile myFile = getFileInfo(id);
        return new File(myFile.getFilePath());
    }

    public void zipFiles(List<MyFile> files, String fileNameZip, String folderZip) throws IOException {
        byte[] buffer = new byte[1024];
        FileOutputStream fos = new FileOutputStream(folderZip + File.separator + fileNameZip);
        ZipOutputStream zos = new ZipOutputStream(fos);
        for (MyFile file : files) {
            ZipEntry entry = new ZipEntry(file.getTenFile());
            zos.putNextEntry(entry);
            InputStream inputStream = fileStorageService.loadFile(file.getFilePath()).getInputStream();
            int len;
            while ((len = inputStream.read(buffer)) > 0) {
                zos.write(buffer, 0, len);
            }
            inputStream.close();
        }
        zos.closeEntry();
        zos.close();
        fos.close();
    }

}
