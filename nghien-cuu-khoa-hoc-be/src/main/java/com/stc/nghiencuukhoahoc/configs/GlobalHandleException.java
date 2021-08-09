package com.stc.nghiencuukhoahoc.configs;

import com.stc.nghiencuukhoahoc.exceptions.CustomizeErrorException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 11/21/19
 * Time      : 10:39 AM
 * Filename  : GlobalHandleException
 */
@ControllerAdvice("com.stc.quanlyxe")
@RestController
public class GlobalHandleException extends ResponseEntityExceptionHandler {
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers, HttpStatus status, WebRequest request) {
        CustomizeErrorException errorException = new CustomizeErrorException();
        errorException.setStatus(HttpStatus.BAD_REQUEST.value());
        errorException.setError("Validation failed");
        errorException.setMessage(ex.getBindingResult().getAllErrors().get(0).getDefaultMessage());
        return new ResponseEntity<>(errorException, HttpStatus.BAD_REQUEST);
    }
}
