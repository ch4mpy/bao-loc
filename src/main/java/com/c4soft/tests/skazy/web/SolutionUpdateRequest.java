package com.c4soft.tests.skazy.web;

import java.io.Serializable;
import java.util.Objects;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.xml.bind.annotation.XmlRootElement;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.NotNull;

@XmlRootElement
@DistinctValues({ "x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8", "x9" })
public class SolutionUpdateRequest implements Serializable {
	private static final long serialVersionUID = 6974152954909945259L;

	@NotNull
	@Min(1)
	@Max(9)
	@JsonProperty
	public final Long x1;

	@NotNull
	@Min(1)
	@Max(9)
	@JsonProperty
	public final Long x2;

	@NotNull
	@Min(1)
	@Max(9)
	@JsonProperty
	public final Long x3;

	@NotNull
	@Min(1)
	@Max(9)
	@JsonProperty
	public final Long x4;

	@NotNull
	@Min(1)
	@Max(9)
	@JsonProperty
	public final Long x5;

	@NotNull
	@Min(1)
	@Max(9)
	@JsonProperty
	public final Long x6;

	@NotNull
	@Min(1)
	@Max(9)
	@JsonProperty
	public final Long x7;

	@NotNull
	@Min(1)
	@Max(9)
	@JsonProperty
	public final Long x8;

	@NotNull
	@Min(1)
	@Max(9)
	@JsonProperty
	public final Long x9;

	public SolutionUpdateRequest(
			@Min(1) @Max(9) Long x1,
			@Min(1) @Max(9) Long x2,
			@Min(1) @Max(9) Long x3,
			@Min(1) @Max(9) Long x4,
			@Min(1) @Max(9) Long x5,
			@Min(1) @Max(9) Long x6,
			@Min(1) @Max(9) Long x7,
			@Min(1) @Max(9) Long x8,
			@Min(1) @Max(9) Long x9) {
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
		if (!(obj instanceof SolutionUpdateRequest)) {
			return false;
		}
		final SolutionUpdateRequest other = (SolutionUpdateRequest) obj;
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
