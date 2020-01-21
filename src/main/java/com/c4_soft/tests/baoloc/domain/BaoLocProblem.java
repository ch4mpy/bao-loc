package com.c4_soft.tests.baoloc.domain;

import org.springframework.stereotype.Component;

/**
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
@Component
public class BaoLocProblem implements Problem {

	@Override
	public double computeValue(Solution porposedSolution) {
		return porposedSolution.getX1().doubleValue()
				+ 13.0 * porposedSolution.getX2().doubleValue() / porposedSolution.getX3().doubleValue()
				+ porposedSolution.getX4().doubleValue() + 12.0 * porposedSolution.getX5().doubleValue()
				- porposedSolution.getX6().doubleValue() - 11.0 + porposedSolution.getX7().doubleValue()
						* porposedSolution.getX8().doubleValue() / porposedSolution.getX9().doubleValue()
				- 10.0;
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
