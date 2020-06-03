package com.c4_soft.tests.baoloc.web.dto;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlRootElement;

import org.springframework.hateoas.RepresentationModel;

/**
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
@XmlRootElement
public class SolutionResponse extends RepresentationModel<SolutionResponse> implements Serializable {
	private static final long serialVersionUID = -6427729256535659720L;

	public final long x1;

	public final long x2;

	public final long x3;

	public final long x4;

	public final long x5;

	public final long x6;

	public final long x7;

	public final long x8;

	public final long x9;

	public SolutionResponse(long x1, long x2, long x3, long x4, long x5, long x6, long x7, long x8, long x9) {
		super();
		this.x1 = x1;
		this.x2 = x2;
		this.x3 = x3;
		this.x4 = x4;
		this.x5 = x5;
		this.x6 = x6;
		this.x7 = x7;
		this.x8 = x8;
		this.x9 = x9;
	}
}
