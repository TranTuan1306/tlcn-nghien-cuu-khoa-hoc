package com.stc.nghiencuukhoahoc.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 11/21/19
 * Time      : 10:50 AM
 * Filename  : CustomizeErrorException
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomizeErrorException {
    private Date timestamp = new Date();

    private int status;

    private String error;

    private String message;

    private String path;
}
