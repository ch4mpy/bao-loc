package com.c4_soft.bao_loc.web.dtos;

import jakarta.validation.constraints.NotEmpty;

public record SampleEditDto(@NotEmpty String mappedLabel) {
}