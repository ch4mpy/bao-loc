package com.c4_soft.tests.baoloc.domain;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

/**
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
class BruteForceBoaLocProblemSolutionFinderTest {

	final static BaoLocProblem PB = new BaoLocProblem();

	@Test
	void testBruteForceSolutionFinderFindsHasSolutionsToBaoLocProblem() {
		final var pb = new BruteForceBoaLocProblemSolutionFinder();
		final var actual = pb.solve(new BaoLocProblem());

		assertTrue(actual.size() > 0);

		actual.forEach(solution -> {
			final var result = PB.computeValue(solution);
			assertEquals(
					BruteForceBoaLocProblemSolutionFinder.EXPECTED_RESULT,
					result,
					BruteForceBoaLocProblemSolutionFinder.MAX_DELTA);
		});
	}

}
