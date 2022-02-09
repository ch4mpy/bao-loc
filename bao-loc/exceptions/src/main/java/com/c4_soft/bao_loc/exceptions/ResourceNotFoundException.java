package com.c4_soft.bao_loc.exceptions;

/**
 * 
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 *
 */
public class ResourceNotFoundException extends RuntimeException {
	private static final long serialVersionUID = 3751906581485680652L;

	public ResourceNotFoundException(String message) {
		super(message);
	}

}
