package com.c4soft.tests.skazy.domain;

import org.springframework.stereotype.Component;

@Component
public class BaoLocProblem implements Problem {

	@Override
	public double computeValue(Solution porposedSolution) {
		return porposedSolution.getX1() + 13.0 * porposedSolution.getX2() / porposedSolution.getX3()
				+ porposedSolution.getX4() + 12.0 * porposedSolution.getX5() - porposedSolution.getX6() - 11.0
				+ porposedSolution.getX7() * porposedSolution.getX8() / porposedSolution.getX9() - 10.0;
	}

	@Override
	public boolean isAcceptable(Solution solution) {
		return elementsAreInRange(solution) && elementsAreDifferent(solution);
	}

	static boolean elementsAreInRange(Solution solution) {
		return ACCEPTED_SOLUTION_ELEMENTS_VALUES.contains(solution.getX1())
				&& ACCEPTED_SOLUTION_ELEMENTS_VALUES.contains(solution.getX2())
				&& ACCEPTED_SOLUTION_ELEMENTS_VALUES.contains(solution.getX3())
				&& ACCEPTED_SOLUTION_ELEMENTS_VALUES.contains(solution.getX4())
				&& ACCEPTED_SOLUTION_ELEMENTS_VALUES.contains(solution.getX5())
				&& ACCEPTED_SOLUTION_ELEMENTS_VALUES.contains(solution.getX6())
				&& ACCEPTED_SOLUTION_ELEMENTS_VALUES.contains(solution.getX7())
				&& ACCEPTED_SOLUTION_ELEMENTS_VALUES.contains(solution.getX8())
				&& ACCEPTED_SOLUTION_ELEMENTS_VALUES.contains(solution.getX9());
	}

	static boolean elementsAreDifferent(Solution solution) {
		return solution.getX1() != solution.getX2()
				&& solution.getX1() != solution.getX3()
				&& solution.getX1() != solution.getX4()
				&& solution.getX1() != solution.getX5()
				&& solution.getX1() != solution.getX6()
				&& solution.getX1() != solution.getX7()
				&& solution.getX1() != solution.getX8()
				&& solution.getX1() != solution.getX9()
				&& solution.getX2() != solution.getX3()
				&& solution.getX2() != solution.getX4()
				&& solution.getX2() != solution.getX5()
				&& solution.getX2() != solution.getX6()
				&& solution.getX2() != solution.getX7()
				&& solution.getX2() != solution.getX8()
				&& solution.getX2() != solution.getX9()
				&& solution.getX3() != solution.getX4()
				&& solution.getX3() != solution.getX5()
				&& solution.getX3() != solution.getX6()
				&& solution.getX3() != solution.getX7()
				&& solution.getX3() != solution.getX8()
				&& solution.getX3() != solution.getX9()
				&& solution.getX4() != solution.getX5()
				&& solution.getX4() != solution.getX6()
				&& solution.getX4() != solution.getX7()
				&& solution.getX4() != solution.getX8()
				&& solution.getX4() != solution.getX9()
				&& solution.getX5() != solution.getX6()
				&& solution.getX5() != solution.getX7()
				&& solution.getX5() != solution.getX8()
				&& solution.getX5() != solution.getX9()
				&& solution.getX6() != solution.getX7()
				&& solution.getX6() != solution.getX8()
				&& solution.getX6() != solution.getX9()
				&& solution.getX7() != solution.getX8()
				&& solution.getX7() != solution.getX9()
				&& solution.getX8() != solution.getX9();
	}

}
