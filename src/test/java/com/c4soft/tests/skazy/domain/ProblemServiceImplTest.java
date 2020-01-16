package com.c4soft.tests.skazy.domain;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.c4soft.tests.skazy.ProblemSolver;
import com.c4soft.tests.skazy.persistence.SolutionRepository;

@SpringBootTest
class ProblemServiceImplTest {

	@MockBean
	Problem problem;

	@MockBean
	ProblemSolver solver;

	@MockBean
	SolutionRepository solutionRepo;

	@Autowired
	ProblemServiceImpl pbService;

	@Test
	void whenDbContainsSolutionsThenSolverIsNotCalledAndSolutionsAreRetrivedFromRepo() {
		final var solutions = Set.of(new Solution(6, 4, 2, 3, 5, 9, 1, 8, 7), new Solution(8, 2, 1, 3, 4, 5, 9, 6, 7));

		when(solutionRepo.count()).thenReturn(2L);
		when(solutionRepo.findAll()).thenReturn(solutions);

		assertEquals(solutions, pbService.getSolutions());
		verify(solver, times(0)).solve(any());
		verify(solutionRepo, times(0)).saveAll(any());
	}

	@Test
	void whenDbDoesNotContainSolutionsThenSolutionsAreRetrivedFromSolverAndSaved() {
		final var solutions = Set.of(new Solution(6, 4, 2, 3, 5, 9, 1, 8, 7), new Solution(8, 2, 1, 3, 4, 5, 9, 6, 7));

		when(solutionRepo.count()).thenReturn(0L);
		when(solver.solve(problem)).thenReturn(solutions);
		when(solutionRepo.saveAll(solutions)).thenAnswer(invocation -> {
			var id = 0L;
			for (final var solution : solutions) {
				solution.setId(++id);
			}
			return solutions;
		});

		assertEquals(solutions, pbService.getSolutions());
		verify(solutionRepo, times(0)).findAll();
	}

}
