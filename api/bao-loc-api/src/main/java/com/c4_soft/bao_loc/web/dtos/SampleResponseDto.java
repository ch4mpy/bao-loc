package com.c4_soft.bao_loc.web.dtos;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record SampleResponseDto(@NotNull Long id, @NotEmpty String mappedLabel) {
}