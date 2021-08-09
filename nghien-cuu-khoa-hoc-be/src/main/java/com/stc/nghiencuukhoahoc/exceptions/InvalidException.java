package com.stc.nghiencuukhoahoc.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by Intellij IDEA.
 * User: Tín Nguyễn.
 * Date: 2019-09-12.
 * Time: 14:24.
 * Filename: InvalidException.
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidException  extends RuntimeException{
    public InvalidException() {
    }

    public InvalidException(String message) {
        super(message);
    }
}
