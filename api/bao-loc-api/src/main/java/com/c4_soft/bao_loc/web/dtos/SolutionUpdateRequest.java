package com.c4_soft.bao_loc.web.dtos;

import com.c4_soft.bao_loc.domain.validation.DistinctValues;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

/**
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
@DistinctValues({ "x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8", "x9" })
public record SolutionUpdateRequest(
		@NotNull @Min(1) @Max(9) @JsonProperty Long x1,
		@NotNull @Min(1) @Max(9) @JsonProperty Long x2,
		@NotNull @Min(1) @Max(9) @JsonProperty Long x3,
		@NotNull @Min(1) @Max(9) @JsonProperty Long x4,
		@NotNull @Min(1) @Max(9) @JsonProperty Long x5,
		@NotNull @Min(1) @Max(9) @JsonProperty Long x6,
		@NotNull @Min(1) @Max(9) @JsonProperty Long x7,
		@NotNull @Min(1) @Max(9) @JsonProperty Long x8,
		@NotNull @Min(1) @Max(9) @JsonProperty Long x9) {
}
