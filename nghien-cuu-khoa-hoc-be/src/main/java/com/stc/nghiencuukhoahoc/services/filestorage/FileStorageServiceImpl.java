package com.stc.nghiencuukhoahoc.services.filestorage;

import com.stc.nghiencuukhoahoc.configs.FileStorageProperties;
import com.stc.nghiencuukhoahoc.dtos.FileStoreResult;
import com.stc.nghiencuukhoahoc.exceptions.InternalServerException;
import com.stc.nghiencuukhoahoc.exceptions.InvalidException;
import com.stc.nghiencuukhoahoc.exceptions.NotFoundException;
import com.stc.nghiencuukhoahoc.utils.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Locale;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 5/26/2021
 * Time: 10:51 AM
 * Filename: FileStorageServiceImpl
 */
@Slf4j
@Service
public class FileStorageServiceImpl implements FileStorageService {
    private final Path fileDownloadDirStorageLocation;

    private final Path fileUploadDirStorageLocation;

    private final MessageSource messageSource;

    @Autowired
    public FileStorageServiceImpl(FileStorageProperties fileStorageProperties, MessageSource messageSource) {
        Locale locale = LocaleContextHolder.getLocale();
        this.messageSource = messageSource;
        try {
            this.fileDownloadDirStorageLocation = Paths.get(fileStorageProperties.getDownloadDir()).toAbsolutePath().normalize();
            if (Files.notExists(fileDownloadDirStorageLocation)) {
                File file = fileDownloadDirStorageLocation.toFile();
                file.mkdir();
            }
        } catch (Exception ex) {
            throw new InternalServerException("Đã có lỗi xảy ra!");
        }

        try {
            this.fileUploadDirStorageLocation = Paths.get(fileStorageProperties.getUploadDir()).toAbsolutePath().normalize();
            if (Files.notExists(fileUploadDirStorageLocation)) {
                File file = fileUploadDirStorageLocation.toFile();
                file.mkdir();
            }
        } catch (Exception ex) {
            throw new InternalServerException("Đã có lỗi xảy ra!");
        }
    }

    @Override
    public FileStoreResult storeFile(File file, String subFolder) {
        Locale locale = LocaleContextHolder.getLocale();
        // Normalize file name
        String fileName = StringUtils.optimizeFilename(file.getName());
        try {
            // Check if the file's name contains invalid characters
            if (fileName.contains("..")) {
                throw new InvalidException("Tên file không hợp lệ!");
            }
            Path targetLocation;
            if (!ObjectUtils.isEmpty(subFolder)) {
                if (!Files.exists(Paths.get(this.fileUploadDirStorageLocation.getFileName().toString() + File.separatorChar + subFolder))) {
                    String fullDirectoryPath = this.fileUploadDirStorageLocation.toAbsolutePath() + this.fileUploadDirStorageLocation.getFileName().toString() + File.separator + subFolder;
                    File directory = new File(fullDirectoryPath);
                    directory.mkdir();
                }
                targetLocation = Paths.get(this.fileUploadDirStorageLocation.getFileName().toString() + File.separatorChar +
                        subFolder + File.separatorChar + fileName);
            } else {
                targetLocation = Paths.get(this.fileUploadDirStorageLocation.getFileName().toString() + File.separatorChar + fileName);
            }
            FileUtils.copyFile(file, targetLocation.toFile(), true);
            // xoa file temp
            FileUtils.deleteQuietly(file);
            FileStoreResult fileStoreResult = new FileStoreResult();
            fileStoreResult.setTenFile(fileName);
            fileStoreResult.setDuongDan(targetLocation.toString());
            return fileStoreResult;
        } catch (IOException ex) {
            throw new InternalServerException("Đã có lỗi xảy ra!");
        }
    }

    @Override
    public Resource loadFile(String location) {
        Locale locale = LocaleContextHolder.getLocale();
        try {
            if (Files.notExists(Paths.get(location))) {
                throw new NotFoundException(messageSource.getMessage("error.filenotfound", null, locale));
            }
            Path filePath = Paths.get(location);
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new NotFoundException(messageSource.getMessage("error.filenotfound", null, locale));
            }
        } catch (MalformedURLException ex) {
            throw new NotFoundException(messageSource.getMessage("error.filenotfound", null, locale));
        }
    }
}
