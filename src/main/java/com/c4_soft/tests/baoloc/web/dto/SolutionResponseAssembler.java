package com.c4_soft.tests.baoloc.web.dto;

import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import com.c4_soft.tests.baoloc.domain.Solution;
import com.c4_soft.tests.baoloc.web.SolutionsController;

@Component
public class SolutionResponseAssembler
		extends
		RepresentationModelAssemblerSupport<Solution, SolutionResponse> {

	public SolutionResponseAssembler() {
		super(SolutionsController.class, SolutionResponse.class);
	}

	@Override
	public SolutionResponse toModel(Solution solution) {
		return createModelWithId(solution.getId(), solution);
	}

	@Override
	protected SolutionResponse instantiateModel(Solution solution) {
		return new SolutionResponse(
				solution.getX1(),
				solution.getX2(),
				solution.getX3(),
				solution.getX4(),
				solution.getX5(),
				solution.getX6(),
				solution.getX7(),
				solution.getX8(),
				solution.getX9());
	}

}