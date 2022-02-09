package com.c4_soft.bao_loc.web;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants.ComponentModel;

import com.c4_soft.bao_loc.domain.jpa.Solution;
import com.c4_soft.bao_loc.web.dtos.SolutionResponse;
import com.c4_soft.bao_loc.web.dtos.SolutionUpdateRequest;

/**
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
@Mapper(componentModel = ComponentModel.SPRING)
public interface SolutionMapper {
	SolutionResponse toDto(Solution domain);

	@Mapping(target = "id", ignore = true)
	@Mapping(target = "player", ignore = true)
	Solution toDomain(SolutionUpdateRequest dto);
}