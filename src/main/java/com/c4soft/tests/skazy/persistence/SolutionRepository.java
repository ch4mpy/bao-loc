package com.c4soft.tests.skazy.persistence;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.c4soft.tests.skazy.domain.Solution;

public interface SolutionRepository extends PagingAndSortingRepository<Solution, Long> {

}
