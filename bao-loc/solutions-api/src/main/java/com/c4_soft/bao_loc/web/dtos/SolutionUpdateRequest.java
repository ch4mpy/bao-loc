package com.c4_soft.bao_loc.web.dtos;

import java.io.Serializable;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.xml.bind.annotation.XmlRootElement;

import com.c4_soft.bao_loc.domain.validation.DistinctValues;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
@XmlRootElement
@DistinctValues({ "x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8", "x9" })
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SolutionUpdateRequest implements Serializable {
	private static final long serialVersionUID = 6974152954909945259L;

	@NotNull
	@Min(1)
	@Max(9)
	@JsonProperty
	public Long x1;

	@NotNull
	@Min(1)
	@Max(9)
	@JsonProperty
	public Long x2;

	@NotNull
	@Min(1)
	@Max(9)
	@JsonProperty
	public Long x3;

	@NotNull
	@Min(1)
	@Max(9)
	@JsonProperty
	public Long x4;

	@NotNull
	@Min(1)
	@Max(9)
	@JsonProperty
	public Long x5;

	@NotNull
	@Min(1)
	@Max(9)
	@JsonProperty
	public Long x6;

	@NotNull
	@Min(1)
	@Max(9)
	@JsonProperty
	public Long x7;

	@NotNull
	@Min(1)
	@Max(9)
	@JsonProperty
	public Long x8;

	@NotNull
	@Min(1)
	@Max(9)
	@JsonProperty
	public Long x9;
}
