package com.stc.nghiencuukhoahoc.services.cauhinhemail;

import com.stc.nghiencuukhoahoc.dtos.CauHinhEmailDto;
import com.stc.nghiencuukhoahoc.entities.CauHinhEmail;
import com.stc.nghiencuukhoahoc.exceptions.InvalidException;
import com.stc.nghiencuukhoahoc.exceptions.NotFoundException;
import com.stc.nghiencuukhoahoc.repositories.CauHinhEmailRepository;
import com.stc.nghiencuukhoahoc.utils.PageUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.List;
import java.util.Locale;

/**
 * Created by IntelliJ IDEA.
 * User: thangtm
 * Date: 4/28/2021
 * Time: 3:16 PM
 * Filename: CauHinhEmailServiceImpl
 */
@Service
@Slf4j
public class CauHinhEmailServiceImpl implements CauHinhEmailService{
    private final MessageSource messageSource;

    private final CauHinhEmailRepository cauHinhEmailRepository;

    public CauHinhEmailServiceImpl(MessageSource messageSource, CauHinhEmailRepository cauHinhEmailRepository) {
        this.messageSource = messageSource;
        this.cauHinhEmailRepository = cauHinhEmailRepository;
    }

    @Override
    public CauHinhEmail getCauHinhCore() {
        Locale locale = LocaleContextHolder.getLocale();
        List<CauHinhEmail> cauHinhHeThongs = cauHinhEmailRepository.findAll();
        if (cauHinhHeThongs.size() == 0) {
            throw new NotFoundException(messageSource.getMessage("error.cauhinhhethongnotfound", null, locale));
        }
        return cauHinhHeThongs.get(0);
    }

    @Override
    public Page<CauHinhEmail> getAllCauHinhPaging(int page, int size, String sort, String column) {
        Pageable pageable = PageUtils.createPageable(page, size, sort, column);
        return cauHinhEmailRepository.findAll(pageable);

    }

    @Override
    public CauHinhEmail create(CauHinhEmailDto dto) {
        Locale locale = LocaleContextHolder.getLocale();

        if(ObjectUtils.isEmpty(dto.getEmailGuiThu())){
            throw new InvalidException(messageSource.getMessage("error.cauhinhhethongemailnotempty", null, locale));
        }
        if(ObjectUtils.isEmpty(dto.getPassEmailGuiThu())){
            throw new InvalidException(messageSource.getMessage("error.cauhinhhethongpasswordnotempty", null, locale));
        }

        if(cauHinhEmailRepository.count() != 0){
            throw new InvalidException(messageSource.getMessage("error.cauhinhhethongexisted",null, locale));
        }
        CauHinhEmail cauHinhEmail = new CauHinhEmail();
        cauHinhEmail.setEmailNhanThu(dto.getEmailNhanThu());
        cauHinhEmail.setEmailGuiThu(dto.getEmailGuiThu());
        cauHinhEmail.setPassEmailGuiThu(dto.getPassEmailGuiThu());
        cauHinhEmailRepository.save(cauHinhEmail);
        return cauHinhEmail;

    }

    @Override
    public CauHinhEmail update(String id, CauHinhEmailDto dto) {
        Locale locale = LocaleContextHolder.getLocale();
        CauHinhEmail cauHinhEmail = getById(id);
        if (ObjectUtils.isEmpty(dto.getEmailGuiThu())) {
            throw new InvalidException(messageSource.getMessage("error.cauhinhhethongemailnotempty", null, locale));
        }
        if (ObjectUtils.isEmpty(dto.getPassEmailGuiThu())) {
            throw new InvalidException(messageSource.getMessage("error.cauhinhhethongpasswordnotempty", null, locale));
        }
        cauHinhEmail.setEmailNhanThu(dto.getEmailNhanThu());
        cauHinhEmail.setEmailGuiThu(dto.getEmailGuiThu());
        cauHinhEmail.setPassEmailGuiThu(dto.getPassEmailGuiThu());
        cauHinhEmailRepository.save(cauHinhEmail);
        return cauHinhEmail;

    }

    @Override
    public CauHinhEmail getById(String id) {
        Locale locale = LocaleContextHolder.getLocale();
        return  cauHinhEmailRepository.findById(id).orElseThrow(
                () -> new NotFoundException(String.format(messageSource.getMessage("error.cauhinhhethongnotfound", null , locale),id)));

    }
}
