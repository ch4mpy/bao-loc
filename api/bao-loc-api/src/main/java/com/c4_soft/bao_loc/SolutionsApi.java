package com.c4_soft.bao_loc;

import java.util.Collection;
import java.util.Map;
import java.util.Objects;

import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.access.expression.method.MethodSecurityExpressionHandler;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.c4_soft.bao_loc.domain.jpa.Player;
import com.c4_soft.bao_loc.domain.jpa.PlayerRepository;
import com.c4_soft.bao_loc.domain.jpa.Solution;
import com.c4_soft.bao_loc.domain.jpa.SolutionRepository;
import com.c4_soft.springaddons.security.oauth2.OAuthentication;
import com.c4_soft.springaddons.security.oauth2.OpenidClaimSet;
import com.c4_soft.springaddons.security.oauth2.config.synchronised.OAuth2AuthenticationFactory;
import com.c4_soft.springaddons.security.oauth2.spring.C4MethodSecurityExpressionHandler;
import com.c4_soft.springaddons.security.oauth2.spring.C4MethodSecurityExpressionRoot;

@SpringBootApplication
@EnableTransactionManagement
public class SolutionsApi {
	public static void main(String[] args) {
		new SpringApplicationBuilder(SolutionsApi.class).web(WebApplicationType.SERVLET).run(args);
	}

	@Configuration
	@EnableMethodSecurity
	public static class WebSecurityConfig {
		@Bean
		OAuth2AuthenticationFactory authenticationFactory(Converter<Map<String, Object>, Collection<? extends GrantedAuthority>> authoritiesConverter) {
			return (String bearerString, Map<String, Object> claims) -> {
				return new OAuthentication<>(new OpenidClaimSet(claims), authoritiesConverter.convert(claims), bearerString);
			};
		}

		@Bean
		MethodSecurityExpressionHandler methodSecurityExpressionHandler() {
			return new C4MethodSecurityExpressionHandler(BaoLocMethodSecurityExpressionRoot::new);
		}

		static final class BaoLocMethodSecurityExpressionRoot extends C4MethodSecurityExpressionRoot {
			public boolean is(String preferredUsername) {
				return Objects.equals(preferredUsername, getAuthentication().getName());
			}
		}
	}

	@EnableJpaRepositories(basePackageClasses = { PlayerRepository.class, SolutionRepository.class })
	@EntityScan(basePackageClasses = { Player.class, Solution.class })
	public static class PersistenceConfig {
	}

}
