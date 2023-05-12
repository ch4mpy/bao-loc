package com.c4_soft.bao_loc.exceptions;

import java.io.IOException;
import java.util.NoSuchElementException;

import org.springframework.beans.TypeMismatchException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import jakarta.servlet.http.HttpServletResponse;

/**
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
@ControllerAdvice
public class BaoLocExceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler(ResourceNotFoundException.class)
	public void handleResourceNotFoundException(HttpServletResponse response) throws IOException {
		response.sendError(HttpStatus.NOT_FOUND.value());
	}

	@ExceptionHandler(ForbidenException.class)
	public void handleForbidenException(HttpServletResponse response) throws IOException {
		response.sendError(HttpStatus.FORBIDDEN.value());
	}

	@ExceptionHandler(NotAcceptableSolutionException.class)
	public void handleNotAcceptableSolutionException(HttpServletResponse response) throws IOException {
		response.sendError(HttpStatus.BAD_REQUEST.value());
	}

	@Override
	protected ResponseEntity<Object> handleTypeMismatch(TypeMismatchException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
		if (ex.getCause() != null
				&& (ex.getCause().getClass().isAssignableFrom(NoSuchElementException.class)
						|| (ex.getCause().getCause() != null && ex.getCause().getCause().getClass().isAssignableFrom(NoSuchElementException.class)))) {
			return super.handleTypeMismatch(ex, headers, HttpStatus.NOT_FOUND, request);
		}
		return super.handleTypeMismatch(ex, headers, status, request);
	}

}
