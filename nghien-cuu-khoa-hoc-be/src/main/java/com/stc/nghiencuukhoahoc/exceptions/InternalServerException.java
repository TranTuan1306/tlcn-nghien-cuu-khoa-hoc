package com.stc.nghiencuukhoahoc.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by Intellij IDEA.
 * User: Tín Nguyễn.
 * Date: 2019-09-12.
 * Time: 10:58.
 * Filename: InternalServerException.
 */
@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class InternalServerException extends RuntimeException{
    public InternalServerException() {
        super("Đã có lỗi xảy ra !!!");
    }

    public InternalServerException(String message) {
        super(message);
    }
}
