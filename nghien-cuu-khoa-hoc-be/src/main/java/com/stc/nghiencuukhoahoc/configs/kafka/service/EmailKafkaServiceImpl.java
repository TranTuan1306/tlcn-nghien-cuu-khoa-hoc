package com.stc.nghiencuukhoahoc.configs.kafka.service;

import com.stc.nghiencuukhoahoc.configs.kafka.model.FileEmail;
import com.stc.nghiencuukhoahoc.configs.kafka.model.TextEmail;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

/**
 * Created by Intellij IDEA.
 * User: Tín Nguyễn.
 * Date: 2/25/20.
 * Time: 14:19.
 * Filename: EmailServiceImpl.
 */
@Service
public class EmailKafkaServiceImpl implements EmailKafkaService {

    @Value("${kafka.topic.email-no-template}")
    private String textEmailTopic;

    @Value("${kafka.topic.email-with-template}")
    private String templateEmailTopic;

    @Value("${kafka.topic.email-with-attachment}")
    private String fileEmailTopic;

    private final KafkaTemplate<String, TextEmail> textEmailKafkaTemplate;

    private final KafkaTemplate<String, FileEmail> fileEmailKafkaTemplate;


    public EmailKafkaServiceImpl(KafkaTemplate<String, TextEmail> textEmailKafkaTemplate, KafkaTemplate<String, FileEmail> fileEmailKafkaTemplate) {
        this.textEmailKafkaTemplate = textEmailKafkaTemplate;
        this.fileEmailKafkaTemplate = fileEmailKafkaTemplate;
    }

    @Override
    public void sendTextEmail(TextEmail textEmail) {
        textEmailKafkaTemplate.send(textEmailTopic, textEmail);
    }

    @Override
    public void sendTemplateEmail(TextEmail textEmail) {
        textEmailKafkaTemplate.send(templateEmailTopic, textEmail);
    }

    @Override
    public void sendFileEmail(FileEmail fileEmail) {
        fileEmailKafkaTemplate.send(fileEmailTopic, fileEmail);
    }
}
