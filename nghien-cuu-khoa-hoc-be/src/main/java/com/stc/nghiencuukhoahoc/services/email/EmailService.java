package com.stc.nghiencuukhoahoc.services.email;

import java.util.Map;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 4/28/2021
 * Time: 2:43 PM
 * Filename: EmailService
 */
public interface EmailService {
    void sendTextMail(String nguoiNhanThu, String subject, String templateName, Map<String, Object> model, String message);
}
