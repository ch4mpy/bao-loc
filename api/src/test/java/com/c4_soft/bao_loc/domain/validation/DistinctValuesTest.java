package com.c4_soft.bao_loc.domain.validation;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import javax.validation.Validator;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

@ExtendWith(SpringExtension.class)
class DistinctValuesTest {
	@Autowired
	Validator validator;

	@Test
	void whenValuesAreDistinctThenNoViolation() {
		final var violations = validator.validate(new Validated("1", "2", "3", "4"));
		assertEquals(0, violations.size());
	}

	@Test
	void whenFirstAndSecondValuesValuesAreEqualThenViolation() {
		final var violations = validator.validate(new Validated("2", "2", "3", "4"));
		assertNotEquals(0, violations.size());
	}

	@Test
	void whenFirstAndThirdValuesValuesAreEqualThenViolation() {
		final var violations = validator.validate(new Validated("1", "2", "1", "4"));
		assertNotEquals(0, violations.size());
	}

	@Test
	void whenFourthValueIsEqualToAnyOtherDistinctValuesThenNoViolation() {
		assertEquals(0, validator.validate(new Validated("1", "2", "3", "1")).size());
		assertEquals(0, validator.validate(new Validated("1", "2", "3", "2")).size());
		assertEquals(0, validator.validate(new Validated("1", "2", "3", "3")).size());
	}

	@Test
	void whenOnlyOneOfCheckValuesIsNullThenNoViolation() {
		assertEquals(0, validator.validate(new Validated(null, "2", "3", "4")).size());
		assertEquals(0, validator.validate(new Validated("1", null, "3", "4")).size());
		assertEquals(0, validator.validate(new Validated("1", "2", null, "4")).size());
	}

	@Test
	void whenTwoOrMoreCheckValuesAreNullThenViolation() {
		assertNotEquals(0, validator.validate(new Validated(null, null, "3", "4")).size());
		assertNotEquals(0, validator.validate(new Validated("1", null, null, "4")).size());
		assertNotEquals(0, validator.validate(new Validated(null, "2", null, "4")).size());
		assertNotEquals(0, validator.validate(new Validated(null, null, null, "4")).size());
	}

	@TestConfiguration
	static class TestConfig {
		@Bean
		public javax.validation.Validator localValidatorFactoryBean() {
			return new LocalValidatorFactoryBean();
		}
	}

	@DistinctValues({ "d1", "d2", "d3" })
	static class Validated {
		public final String d1;
		public final String d2;
		public final String d3;
		public final String x;

		public Validated(String d1, String d2, String d3, String x) {
			this.d1 = d1;
			this.d2 = d2;
			this.d3 = d3;
			this.x = x;
		}
	}

}
