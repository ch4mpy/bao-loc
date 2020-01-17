package com.c4soft.tests.skazy.domain;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.c4soft.tests.skazy.persistence.SolutionRepository;

@Service
public class ProblemServiceImpl implements ProblemService {

	private final Problem problem;

	private final ProblemSolver solver;

	private final SolutionRepository solutionRepo;

	@Autowired
	public ProblemServiceImpl(Problem problem, ProblemSolver solver, SolutionRepository solutionRepo) {
		super();
		this.problem = problem;
		this.solver = solver;
		this.solutionRepo = solutionRepo;
	}

	@Override
	public Page<Solution> getSolutions(Pageable pageable) {
		if (solutionRepo.count() == 0) {
			final Collection<Solution> solutions = solver.solve(problem);
			solutionRepo.saveAll(solutions);
		}
		return solutionRepo.findAll(pageable);
	}

}
