package com.c4_soft.tests.baoloc.web.dto;

import java.io.Serializable;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.xml.bind.annotation.XmlRootElement;

import com.c4_soft.tests.baoloc.web.dto.validation.DistinctValues;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.NotNull;

/**
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
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
}
