package com.c4soft.tests.skazy.domain;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

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
		final var solutions = List.of(new Solution(6, 4, 2, 3, 5, 9, 1, 8, 7), new Solution(8, 2, 1, 3, 4, 5, 9, 6, 7));

		when(solutionRepo.count()).thenReturn(2L);
		when(solutionRepo.findAll(any(Pageable.class))).thenReturn(new PageImpl<>(solutions));

		assertEquals(new PageImpl<>(solutions), pbService.getSolutions(PageRequest.of(0, 42)));
		verify(solver, times(0)).solve(any());
		verify(solutionRepo, times(0)).saveAll(any());
	}

	@Test
	void whenDbDoesNotContainSolutionsThenSolutionsAreRetrivedFromSolverAndSaved() {
		final var solutions = List.of(new Solution(6, 4, 2, 3, 5, 9, 1, 8, 7), new Solution(8, 2, 1, 3, 4, 5, 9, 6, 7));

		when(solutionRepo.count()).thenReturn(0L);
		when(solver.solve(problem)).thenReturn(solutions);
		when(solutionRepo.saveAll(solutions)).thenAnswer(invocation -> {
			var id = 0L;
			for (final var solution : solutions) {
				solution.setId(++id);
			}
			return solutions;
		});
		when(solutionRepo.findAll(any(Pageable.class))).thenReturn(new PageImpl<>(solutions));

		assertEquals(new PageImpl<>(solutions), pbService.getSolutions(PageRequest.of(0, 42)));
		verify(solutionRepo, times(0)).findAll();
	}

}
