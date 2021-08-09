package com.stc.nghiencuukhoahoc.configs.kafka.service;


import com.stc.nghiencuukhoahoc.configs.kafka.model.FileEmail;
import com.stc.nghiencuukhoahoc.configs.kafka.model.TextEmail;
import org.springframework.scheduling.annotation.Async;

/**
 * Created by Intellij IDEA.
 * User: Tín Nguyễn.
 * Date: 2/25/20.
 * Time: 14:19.
 * Filename: EmailService.
 */
public interface EmailKafkaService {
    void sendTextEmail(TextEmail textEmail);

    @Async
    void sendTemplateEmail(TextEmail textEmail);

    @Async
    void sendFileEmail(FileEmail fileEmail);
}
