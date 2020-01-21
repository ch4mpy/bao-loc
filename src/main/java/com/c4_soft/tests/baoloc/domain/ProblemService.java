package com.c4_soft.tests.baoloc.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProblemService {

	Page<Solution> getSolutions(Pageable pageable);

}
