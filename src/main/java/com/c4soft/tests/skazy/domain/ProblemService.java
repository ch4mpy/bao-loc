package com.c4soft.tests.skazy.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProblemService {

	Page<Solution> getSolutions(Pageable pageable);

}
