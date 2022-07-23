package com.c4_soft.bao_loc.domain;

import java.util.Set;

import com.c4_soft.bao_loc.domain.jpa.Solution;

/**
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
public interface ProblemService {

	public static final Set<Long> ACCEPTED_SOLUTION_ELEMENTS_VALUES = Set.of(1L, 2L, 3L, 4L, 5L, 6L, 7L, 8L, 9L);

	double computeValue(Solution porposedSolution);

	boolean isAcceptable(Solution solution);

}
