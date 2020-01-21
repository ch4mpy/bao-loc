package com.c4_soft.tests.baoloc.web;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.validation.Constraint;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.Payload;

import org.springframework.expression.spel.standard.SpelExpressionParser;

import com.c4_soft.tests.baoloc.web.DistinctValues.DistinctValuesValidator;

@Constraint(validatedBy = DistinctValuesValidator.class)
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface DistinctValues {
	String[] value();

	String message() default "{DistinctValues.message}";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};

	public static class DistinctValuesValidator implements ConstraintValidator<DistinctValues, Object> {
		private static final SpelExpressionParser PARSER = new SpelExpressionParser();
		private String[] fields;

		@Override
		public void initialize(DistinctValues constraintAnnotation) {
			fields = constraintAnnotation.value();
		}

		@Override
		public boolean isValid(Object dto, ConstraintValidatorContext context) {
			final Object[] values = Stream.of(fields)
					.map(field -> PARSER.parseExpression(field).getValue(dto))
					.collect(Collectors.toList())
					.toArray();
			for (int i = 0; i < values.length; ++i) {
				for (int j = i + 1; j < values.length; ++j) {
					if (values[i].equals(values[j])) {
						return false;
					}
				}
			}
			return true;
		}
	}
}