package com.c4_soft.tests.baoloc.persistence;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.c4_soft.tests.baoloc.domain.Solution;

public interface SolutionRepository extends PagingAndSortingRepository<Solution, Long> {

}
