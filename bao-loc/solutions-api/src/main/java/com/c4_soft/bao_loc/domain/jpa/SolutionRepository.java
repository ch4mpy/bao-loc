package com.c4_soft.bao_loc.domain.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
public interface SolutionRepository extends JpaRepository<Solution, Long> {
	List<Solution> findByPlayerSubject(String subject);
}
