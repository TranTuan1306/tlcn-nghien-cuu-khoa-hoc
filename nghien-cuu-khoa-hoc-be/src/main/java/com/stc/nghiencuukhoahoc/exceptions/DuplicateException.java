package com.stc.nghiencuukhoahoc.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by Intellij IDEA.
 * User: Tín Nguyễn.
 * Date: 2019-09-12.
 * Time: 10:51.
 * Filename: DuplicateException.
 */
@ResponseStatus(HttpStatus.CONFLICT)
public class DuplicateException extends RuntimeException {
    public DuplicateException(String message) {
        super(message);
    }
}
