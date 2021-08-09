package com.stc.nghiencuukhoahoc.configs.kafka.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.io.IOUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Intellij IDEA.
 * User: Tín Nguyễn.
 * Date: 2/21/20.
 * Time: 10:00.
 * Filename: FileEmail.
 */
@Getter
@Setter
@NoArgsConstructor
public class FileEmail {
    private String clientId;
    private String emailSender;
    private String passWordSender;
    private List<String> sendTos;
    private String subject;
    private String message;
    private List<FileDetails> files = new ArrayList<>();

    public FileEmail(String clientId,
                     String emailSender,
                     String passWordSender,
                     List<String> sendTos,
                     String subject,
                     String message,
                     List<File> files) {
        this.clientId = clientId;
        this.emailSender = emailSender;
        this.passWordSender = passWordSender;
        this.sendTos = sendTos;
        this.subject = subject;
        this.message = message;
        this.files = getFileDetailsFromFiles(files);
    }

    private List<FileDetails> getFileDetailsFromFiles(List<File> files) {
        return files.parallelStream().map(x -> {
            FileDetails fileDetails = new FileDetails();
            fileDetails.setFileName(x.getName());
            try {
                fileDetails.setFile(IOUtils.toByteArray(new FileInputStream(x)));
            } catch (IOException e) {
                System.out.println("Error: " + e.getMessage());
                //e.printStackTrace();
            }
            fileDetails.setFileSize(x.length());
            return fileDetails;
        }).collect(Collectors.toList());
    }
}
