package com.c4soft.tests.skazy.domain;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class BaoLocProblemTest {

	@Test
	void whenAllValuesBetween1And9ThenElementsAreInRangeIsTrue() {
		assertTrue(BaoLocProblem.elementsAreInRange(new Solution(1, 2, 3, 4, 5, 6, 7, 8, 9)));
	}

	@Test
	void whenAValueIsBelow1ThenElementsAreInRangeIsFalse() {
		assertFalse(BaoLocProblem.elementsAreInRange(new Solution(0, 2, 3, 4, 5, 6, 7, 8, 9)));
		assertFalse(BaoLocProblem.elementsAreInRange(new Solution(1, -1, 3, 4, 5, 6, 7, 8, 9)));
		assertFalse(BaoLocProblem.elementsAreInRange(new Solution(1, 2, -3, 4, 5, 6, 7, 8, 9)));
		assertFalse(BaoLocProblem.elementsAreInRange(new Solution(1, 2, 3, -4, 5, 6, 7, 8, 9)));
		assertFalse(BaoLocProblem.elementsAreInRange(new Solution(1, 2, 3, 4, -5, 6, 7, 8, 9)));
		assertFalse(BaoLocProblem.elementsAreInRange(new Solution(1, 2, 3, 4, 5, -6, 7, 8, 9)));
		assertFalse(BaoLocProblem.elementsAreInRange(new Solution(1, 2, 3, 4, 5, 6, -7, 8, 9)));
		assertFalse(BaoLocProblem.elementsAreInRange(new Solution(1, 2, 3, 4, 5, 6, 7, -8, 9)));
		assertFalse(BaoLocProblem.elementsAreInRange(new Solution(1, 2, 3, 4, 5, 6, 7, 8, -9)));
	}

	@Test
	void whenAValueIsAbove9ThenElementsAreInRangeIsFalse() {
		assertFalse(BaoLocProblem.elementsAreInRange(new Solution(10, 2, 3, 4, 5, 6, 7, 8, 9)));
		assertFalse(BaoLocProblem.elementsAreInRange(new Solution(1, 12, 3, 4, 5, 6, 7, 8, 9)));
		assertFalse(BaoLocProblem.elementsAreInRange(new Solution(1, 2, 13, 4, 5, 6, 7, 8, 9)));
		assertFalse(BaoLocProblem.elementsAreInRange(new Solution(1, 2, 3, 14, 5, 6, 7, 8, 9)));
		assertFalse(BaoLocProblem.elementsAreInRange(new Solution(1, 2, 3, 4, 15, 6, 7, 8, 9)));
		assertFalse(BaoLocProblem.elementsAreInRange(new Solution(1, 2, 3, 4, 5, 16, 7, 8, 9)));
		assertFalse(BaoLocProblem.elementsAreInRange(new Solution(1, 2, 3, 4, 5, 6, 17, 8, 9)));
		assertFalse(BaoLocProblem.elementsAreInRange(new Solution(1, 2, 3, 4, 5, 6, 7, 18, 9)));
		assertFalse(BaoLocProblem.elementsAreInRange(new Solution(1, 2, 3, 4, 5, 6, 7, 8, 19)));
	}

	@Test
	void whenAllValuesAreDifferentThenElementsAreDifferentIsTrue() {
		assertTrue(BaoLocProblem.elementsAreDifferent(new Solution(1, 2, 3, 4, 5, 6, 7, 8, 9)));
	}

	@Test
	void whenAtLeastTwoValuesAreEqualThenElementsAreDifferentIsFalse() {
		assertFalse(BaoLocProblem.elementsAreDifferent(new Solution(9, 2, 3, 4, 5, 6, 7, 8, 9)));
		assertFalse(BaoLocProblem.elementsAreDifferent(new Solution(1, 9, 3, 4, 5, 6, 7, 8, 9)));
		assertFalse(BaoLocProblem.elementsAreDifferent(new Solution(1, 2, 9, 4, 5, 6, 7, 8, 9)));
		assertFalse(BaoLocProblem.elementsAreDifferent(new Solution(1, 2, 3, 9, 5, 6, 7, 8, 9)));
		assertFalse(BaoLocProblem.elementsAreDifferent(new Solution(1, 2, 3, 4, 9, 6, 7, 8, 9)));
		assertFalse(BaoLocProblem.elementsAreDifferent(new Solution(1, 2, 3, 4, 5, 9, 7, 8, 9)));
		assertFalse(BaoLocProblem.elementsAreDifferent(new Solution(1, 2, 3, 4, 5, 6, 9, 8, 9)));
		assertFalse(BaoLocProblem.elementsAreDifferent(new Solution(1, 2, 3, 4, 5, 6, 7, 9, 9)));
		assertFalse(BaoLocProblem.elementsAreDifferent(new Solution(1, 2, 3, 4, 5, 6, 7, 8, 1)));
	}

	@Test
	void whenValuesAre148279356ThenComputedValueIs66() {
		final var actual = new BaoLocProblem().computeValue(new Solution(1, 4, 8, 2, 7, 9, 3, 5, 6));
		assertEquals(66.0, actual, 0.000001);
	}

	@Test
	void whenValuesAreInRangeAndDifferentThenIsAcceptableIsTrue() {
		assertTrue(new BaoLocProblem().isAcceptable(new Solution(8, 2, 1, 3, 4, 5, 9, 6, 7)));
	}

}
