package com.stc.nghiencuukhoahoc.controllers;

import com.stc.nghiencuukhoahoc.entities.MyFile;
import com.stc.nghiencuukhoahoc.services.fileservice.MyFileService;
import com.stc.nghiencuukhoahoc.services.filestorage.FileStorageService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import javax.validation.Valid;
import java.io.File;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 5/26/2021
 * Time: 10:18 AM
 * Filename: FileController
 */
@RestController
@RequestMapping("/rest/file")
public class FileController {
    private final MyFileService myFileService;

    private final FileStorageService fileStorageService;

    public FileController(MyFileService myFileService, FileStorageService fileStorageService) {
        this.myFileService = myFileService;
        this.fileStorageService = fileStorageService;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @PostMapping
    public ResponseEntity<MyFile> uploadFile(@Valid @RequestParam MultipartFile file,
                                             @RequestParam(name = "subFolder", defaultValue = "DT") String subFolder) throws Exception {
        return new ResponseEntity<>(myFileService.uploadFile(file, subFolder.toLowerCase()), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRUONG_DON_VI')")
    @GetMapping("/{id}")
    public ResponseEntity<MyFile> getFileInfo(@PathVariable("id") String id) {
        return new ResponseEntity<>(myFileService.getFileInfo(id), HttpStatus.OK);
    }

    @GetMapping("/view/{id}")
    public ResponseEntity<Resource> viewFile(@PathVariable("id") String id) {
        return new ResponseEntity<>(myFileService.viewFile(id), HttpStatus.OK);
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadFile(@PathVariable("id") String id) {
        File file = myFileService.downloadFile(id);
        Resource resource = fileStorageService.loadFile(file.getAbsolutePath());
        return ResponseEntity.ok()
                .header("filename", file.getName())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .body(resource);
    }
}
