package com.c4soft.tests.skazy.web;

import java.io.Serializable;
import java.util.Objects;

import javax.xml.bind.annotation.XmlRootElement;

import org.springframework.hateoas.RepresentationModel;

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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + Objects.hash(x1, x2, x3, x4, x5, x6, x7, x8, x9);
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!super.equals(obj)) {
			return false;
		}
		if (!(obj instanceof SolutionResponse)) {
			return false;
		}
		final SolutionResponse other = (SolutionResponse) obj;
		return Objects.equals(x1, other.x1)
				&& Objects.equals(x2, other.x2)
				&& Objects.equals(x3, other.x3)
				&& Objects.equals(x4, other.x4)
				&& Objects.equals(x5, other.x5)
				&& Objects.equals(x6, other.x6)
				&& Objects.equals(x7, other.x7)
				&& Objects.equals(x8, other.x8)
				&& Objects.equals(x9, other.x9);
	}
}
