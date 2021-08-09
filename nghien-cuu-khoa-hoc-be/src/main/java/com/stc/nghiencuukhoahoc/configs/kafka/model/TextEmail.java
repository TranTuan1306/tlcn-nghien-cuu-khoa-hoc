package com.stc.nghiencuukhoahoc.configs.kafka.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * Created by Intellij IDEA.
 * User: Tín Nguyễn.
 * Date: 2/19/20.
 * Time: 09:39.
 * Filename: Test.
 */
@Getter
@Setter
public class TextEmail {
    private String clientId;
    private String emailSender;
    private String passWordSender;
    private List<String> sendTos;
    private String subject;
    private String message;
}
