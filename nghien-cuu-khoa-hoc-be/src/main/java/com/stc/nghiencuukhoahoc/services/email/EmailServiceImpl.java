package com.stc.nghiencuukhoahoc.services.email;

import com.stc.nghiencuukhoahoc.configs.kafka.model.TextEmail;
import com.stc.nghiencuukhoahoc.configs.kafka.service.EmailKafkaService;
import com.stc.nghiencuukhoahoc.entities.CauHinhEmail;
import com.stc.nghiencuukhoahoc.exceptions.InvalidException;
import com.stc.nghiencuukhoahoc.services.cauhinhemail.CauHinhEmailService;
import freemarker.template.Configuration;
import freemarker.template.Template;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import org.springframework.util.ObjectUtils;

import java.util.Collections;
import java.util.Locale;
import java.util.Map;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 4/28/2021
 * Time: 2:55 PM
 * Filename: EmailServiceImpl
 */
@Slf4j
@Service
public class EmailServiceImpl implements EmailService{
    private final CauHinhEmailService cauHinhEmailService;

    private final EmailKafkaService emailKafkaService;

    private final Configuration freemarkerConfig;

    private final MessageSource messageSource;

    @Value("${spring.application.name}")
    private String cliendId;

    public EmailServiceImpl(CauHinhEmailService cauHinhEmailService, EmailKafkaService emailKafkaService, Configuration freemarkerConfig, MessageSource messageSource) {
        this.cauHinhEmailService = cauHinhEmailService;
        this.emailKafkaService = emailKafkaService;
        this.freemarkerConfig = freemarkerConfig;
        this.messageSource = messageSource;
    }


    /***
     * @author: thangpx
     * @createdDate: 09/04/2021
     * @param nguoiNhanThu: Email người nhận thư
     * @param subject: Chủ đề thư
     * @param templateName: Tên file template trong thư mục templates, ví dụ: forget-password.ftl
     * @param model: Model truyền vào cho template
     * @param message: nội dung thư trong trường hợp không sử dụng template mail
     */
    @Override
    public void sendTextMail(String nguoiNhanThu, String subject, String templateName, Map<String, Object> model, String message) {
        Locale locale = LocaleContextHolder.getLocale();
        CauHinhEmail cauHinhEmail = cauHinhEmailService.getCauHinhCore();
        TextEmail textEmail = new TextEmail();
        textEmail.setClientId(cliendId);
        textEmail.setEmailSender(cauHinhEmail.getEmailGuiThu());
        textEmail.setPassWordSender(cauHinhEmail.getPassEmailGuiThu());
        textEmail.setSendTos(Collections.singletonList(nguoiNhanThu));
        // nếu không truyền tên template thì gửi mail text
        if (ObjectUtils.isEmpty(templateName)) {
            if (ObjectUtils.isEmpty(message)) {
                throw new InvalidException(messageSource.getMessage("error.messageempty", null, locale));
            }
            textEmail.setSubject(subject);
            textEmail.setMessage(message);
            emailKafkaService.sendTextEmail(textEmail);
        } else {
            try {
                Template template = freemarkerConfig.getTemplate(templateName);
                freemarkerConfig.setDefaultEncoding("UTF-8");
                freemarkerConfig.setLocale(Locale.US);
                String messageMail = FreeMarkerTemplateUtils.processTemplateIntoString(template, model);
                textEmail.setSubject(subject);
                textEmail.setMessage(messageMail);
                emailKafkaService.sendTemplateEmail(textEmail);
            } catch (Exception e) {
                throw new InvalidException(String.format("Error: %s", e.getMessage()));
            }
        }

    }

}
