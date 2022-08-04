package com.c4_soft.bao_loc;

import java.util.Objects;

import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.security.access.expression.method.MethodSecurityExpressionHandler;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.c4_soft.springaddons.security.oauth2.spring.C4MethodSecurityExpressionHandler;
import com.c4_soft.springaddons.security.oauth2.spring.C4MethodSecurityExpressionRoot;

@SpringBootApplication
@EnableTransactionManagement
public class SolutionsApi {
	public static void main(String[] args) {
		new SpringApplicationBuilder(SolutionsApi.class).web(WebApplicationType.SERVLET).run(args);
	}

	@EnableGlobalMethodSecurity(prePostEnabled = true)
	public class WebSecurityConfig {
		@Bean
		public MethodSecurityExpressionHandler methodSecurityExpressionHandler() {
			return new C4MethodSecurityExpressionHandler(ProxiesMethodSecurityExpressionRoot::new);
		}

		static final class ProxiesMethodSecurityExpressionRoot extends C4MethodSecurityExpressionRoot {

			public boolean is(String preferredUsername) {
				return Objects.equals(preferredUsername, getAuthentication().getName());
			}
		}
	}

}
