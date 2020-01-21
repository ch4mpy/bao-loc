package com.c4_soft.tests.baoloc.domain;

import java.util.Collection;

/**
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
public interface ProblemSolver {
	Collection<Solution> solve(Problem problem);
}
