package com.c4_soft.bao_loc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.c4_soft.bao_loc.domain.jpa.PlayerRepository;
import com.c4_soft.bao_loc.domain.jpa.Solution;
import com.c4_soft.bao_loc.domain.jpa.SolutionRepository;

/**
 * Avoid MethodArgumentConversionNotSupportedException with repos MockBean
 *
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
@TestConfiguration
public class EnableSpringDataWebSupportTestConf {
	@Autowired
	PlayerRepository playerRepo;

	@Autowired
	SolutionRepository solutionRepo;

	@Bean
	WebMvcConfigurer configurer() {
		return new WebMvcConfigurer() {

			@Override
			public void addFormatters(FormatterRegistry registry) {
				registry.addConverter(String.class, Solution.class, id -> solutionRepo.findById(Long.valueOf(id)).get());
			}
		};
	}
}