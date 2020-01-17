package com.c4soft.tests.skazy.domain;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
public class BruteForceBoaLocProblemSolutionFinder implements ProblemSolver {

	static final int EXPECTED_RESULT = 66;
	static final double MAX_DELTA = 0.01;

	@Override
	public Collection<Solution> solve(Problem problem) {
		final Collection<Solution> solutions = new HashSet<>();

		explore(problem, Problem.ACCEPTED_SOLUTION_ELEMENTS_VALUES, List.of(), solutions);

		return solutions;
	}

	void explore(
			Problem problem,
			Collection<Long> possibilities,
			List<Long> elements,
			Collection<Solution> validSolutions) {
		if (possibilities.size() > 1) {
			possibilities.forEach(picked -> {
				final var el = new ArrayList<>(elements);
				el.add(picked);
				final var remaining = possibilities.stream().filter(x -> x != picked).collect(Collectors.toSet());
				explore(problem, remaining, el, validSolutions);
			});
		} else {
			final var solution = new Solution(
					elements.get(0),
					elements.get(1),
					elements.get(2),
					elements.get(3),
					elements.get(4),
					elements.get(5),
					elements.get(6),
					elements.get(7),
					possibilities.iterator().next());
			if (problem.isAcceptable(solution)) {
				final var result = problem.computeValue(solution);
				final var delta = Math.abs(EXPECTED_RESULT - result);
				if (delta < MAX_DELTA) {
					validSolutions.add(solution);
				}
			}
		}
	}

}
