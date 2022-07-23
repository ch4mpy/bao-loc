package com.c4_soft.bao_loc.domain;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

import com.c4_soft.bao_loc.domain.jpa.Solution;

/**
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
class BaoLocProblemServiceTest {

	@Test
	void whenAllValuesBetween1And9ThenElementsAreInRangeIsTrue() {
		assertTrue(BaoLocProblemService.elementsAreInRange(new Solution(1L, 2L, 3L, 4L, 5L, 6L, 7L, 8L, 9L)));
	}

	@Test
	void whenAValueIsBelow1ThenElementsAreInRangeIsFalse() {
		assertFalse(BaoLocProblemService.elementsAreInRange(new Solution(0L, 2L, 3L, 4L, 5L, 6L, 7L, 8L, 9L)));
		assertFalse(BaoLocProblemService.elementsAreInRange(new Solution(1L, -1L, 3L, 4L, 5L, 6L, 7L, 8L, 9L)));
		assertFalse(BaoLocProblemService.elementsAreInRange(new Solution(1L, 2L, -3L, 4L, 5L, 6L, 7L, 8L, 9L)));
		assertFalse(BaoLocProblemService.elementsAreInRange(new Solution(1L, 2L, 3L, -4L, 5L, 6L, 7L, 8L, 9L)));
		assertFalse(BaoLocProblemService.elementsAreInRange(new Solution(1L, 2L, 3L, 4L, -5L, 6L, 7L, 8L, 9L)));
		assertFalse(BaoLocProblemService.elementsAreInRange(new Solution(1L, 2L, 3L, 4L, 5L, -6L, 7L, 8L, 9L)));
		assertFalse(BaoLocProblemService.elementsAreInRange(new Solution(1L, 2L, 3L, 4L, 5L, 6L, -7L, 8L, 9L)));
		assertFalse(BaoLocProblemService.elementsAreInRange(new Solution(1L, 2L, 3L, 4L, 5L, 6L, 7L, -8L, 9L)));
		assertFalse(BaoLocProblemService.elementsAreInRange(new Solution(1L, 2L, 3L, 4L, 5L, 6L, 7L, 8L, -9L)));
	}

	@Test
	void whenAValueIsAbove9ThenElementsAreInRangeIsFalse() {
		assertFalse(BaoLocProblemService.elementsAreInRange(new Solution(10L, 2L, 3L, 4L, 5L, 6L, 7L, 8L, 9L)));
		assertFalse(BaoLocProblemService.elementsAreInRange(new Solution(1L, 12L, 3L, 4L, 5L, 6L, 7L, 8L, 9L)));
		assertFalse(BaoLocProblemService.elementsAreInRange(new Solution(1L, 2L, 13L, 4L, 5L, 6L, 7L, 8L, 9L)));
		assertFalse(BaoLocProblemService.elementsAreInRange(new Solution(1L, 2L, 3L, 14L, 5L, 6L, 7L, 8L, 9L)));
		assertFalse(BaoLocProblemService.elementsAreInRange(new Solution(1L, 2L, 3L, 4L, 15L, 6L, 7L, 8L, 9L)));
		assertFalse(BaoLocProblemService.elementsAreInRange(new Solution(1L, 2L, 3L, 4L, 5L, 16L, 7L, 8L, 9L)));
		assertFalse(BaoLocProblemService.elementsAreInRange(new Solution(1L, 2L, 3L, 4L, 5L, 6L, 17L, 8L, 9L)));
		assertFalse(BaoLocProblemService.elementsAreInRange(new Solution(1L, 2L, 3L, 4L, 5L, 6L, 7L, 18L, 9L)));
		assertFalse(BaoLocProblemService.elementsAreInRange(new Solution(1L, 2L, 3L, 4L, 5L, 6L, 7L, 8L, 19L)));
	}

	@Test
	void whenAllValuesAreDifferentThenElementsAreDifferentIsTrue() {
		assertTrue(BaoLocProblemService.elementsAreDifferent(new Solution(1L, 2L, 3L, 4L, 5L, 6L, 7L, 8L, 9L)));
	}

	@Test
	void whenAtLeastTwoValuesAreEqualThenElementsAreDifferentIsFalse() {
		final long[] solution = { 7L, 2L, 8L, 9L, 6L, 5L, 3L, 1L, 4 };
		for (int i = 0; i < 8; ++i) {
			for (int j = i + 1; j < 9; ++j) {
				final long[] invalid = solution.clone();
				invalid[i] = invalid[j];
				assertFalse(
						BaoLocProblemService.elementsAreDifferent(
								new Solution(
										invalid[0],
										invalid[1],
										invalid[2],
										invalid[3],
										invalid[4],
										invalid[5],
										invalid[6],
										invalid[7],
										invalid[8])),
						"elements at indexes " + i + " and " + j + " are equal but true returned");
			}
		}
	}

	@Test
	void whenValuesAre148279356ThenComputedValueIs66() {
		final var actual = new BaoLocProblemService().computeValue(new Solution(1L, 4L, 8L, 2L, 7L, 9L, 3L, 5L, 6L));
		assertEquals(66.0, actual, 0.000001);
	}

	@Test
	void whenValuesAreInRangeAndDifferentThenIsAcceptableIsTrue() {
		assertTrue(new BaoLocProblemService().isAcceptable(new Solution(8L, 2L, 1L, 3L, 4L, 5L, 9L, 6L, 7L)));
	}

}
