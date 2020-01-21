package com.c4_soft.tests.baoloc.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
public interface ProblemService {

	Page<Solution> getSolutions(Pageable pageable);

}
