package com.stc.nghiencuukhoahoc.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by Intellij IDEA.
 * user: ThangTM.
 * Date: 5/27/2019.
 * Time: 2:35 PM.
 * Filename: UnauthorizedException.
 */
@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException(String message) {
        super(message);
    }
}
