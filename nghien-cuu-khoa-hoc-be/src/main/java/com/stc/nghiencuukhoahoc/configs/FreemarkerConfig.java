package com.stc.nghiencuukhoahoc.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.ui.freemarker.FreeMarkerConfigurationFactoryBean;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 2/3/20
 * Time      : 1:53 PM
 * Filename  : FreemarkerConfig
 */
public class FreemarkerConfig {
    @Bean
    public FreeMarkerConfigurationFactoryBean getFreeMarkerConfiguration() {
        FreeMarkerConfigurationFactoryBean bean = new FreeMarkerConfigurationFactoryBean();
        bean.setTemplateLoaderPath("/templates/");
        return bean;
    }
}
