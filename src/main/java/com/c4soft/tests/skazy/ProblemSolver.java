package com.c4soft.tests.skazy;

import java.util.Collection;

import com.c4soft.tests.skazy.domain.Problem;
import com.c4soft.tests.skazy.domain.Solution;

public interface ProblemSolver {
	Collection<Solution> solve(Problem problem);
}
