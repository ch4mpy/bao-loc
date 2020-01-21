package com.c4_soft.tests.baoloc.domain;

import java.util.Set;

public interface Problem {

	public static final Set<Long> ACCEPTED_SOLUTION_ELEMENTS_VALUES = Set.of(1L, 2L, 3L, 4L, 5L, 6L, 7L, 8L, 9L);

	double computeValue(Solution porposedSolution);

	boolean isAcceptable(Solution solution);

}
