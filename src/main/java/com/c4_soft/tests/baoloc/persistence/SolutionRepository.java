package com.c4_soft.tests.baoloc.persistence;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.c4_soft.tests.baoloc.domain.Solution;

/**
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
public interface SolutionRepository extends PagingAndSortingRepository<Solution, Long> {
}
