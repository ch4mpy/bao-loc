package com.c4_soft.bao_loc.web.dtos;

import jakarta.validation.constraints.NotNull;

/**
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
public record SolutionResponse(
		@NotNull Long id,
		@NotNull Long x1,
		@NotNull Long x2,
		@NotNull Long x3,
		@NotNull Long x4,
		@NotNull Long x5,
		@NotNull Long x6,
		@NotNull Long x7,
		@NotNull Long x8,
		@NotNull Long x9) {
}
