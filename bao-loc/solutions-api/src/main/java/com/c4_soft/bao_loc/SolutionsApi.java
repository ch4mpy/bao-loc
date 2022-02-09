package com.c4_soft.bao_loc;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.c4_soft.bao_loc.domain.jpa.Player;
import com.c4_soft.bao_loc.domain.jpa.PlayerRepository;
import com.c4_soft.bao_loc.domain.jpa.Solution;
import com.c4_soft.bao_loc.domain.jpa.SolutionRepository;
import com.c4_soft.bao_loc.exceptions.BaoLocExceptionHandler;
import com.c4_soft.springaddons.security.oauth2.SynchronizedJwt2AuthenticationConverter;
import com.c4_soft.springaddons.security.oauth2.config.OidcServletApiSecurityConfig;
import com.c4_soft.springaddons.security.oauth2.config.ServletSecurityBeans;
import com.c4_soft.springaddons.security.oauth2.config.SpringAddonsSecurityProperties;

@SpringBootApplication(scanBasePackageClasses = { SolutionsApi.class, BaoLocExceptionHandler.class })
@EnableJpaRepositories(basePackageClasses = { PlayerRepository.class, SolutionRepository.class })
@EntityScan(basePackageClasses = { Player.class, Solution.class })
@EnableTransactionManagement
public class SolutionsApi {
	public static void main(String[] args) {
		new SpringApplicationBuilder(SolutionsApi.class).web(WebApplicationType.SERVLET).run(args);
	}

	@EnableWebSecurity
	@EnableGlobalMethodSecurity(prePostEnabled = true)
	@Import({ SpringAddonsSecurityProperties.class, ServletSecurityBeans.class })
	public class WebSecurityConfig extends OidcServletApiSecurityConfig {
		public WebSecurityConfig(
				SynchronizedJwt2AuthenticationConverter<? extends AbstractAuthenticationToken> authenticationConverter,
				SpringAddonsSecurityProperties securityProperties,
				@Value("${server.ssl.enabled:false}") boolean isSslEnabled) {
			super(authenticationConverter, securityProperties, isSslEnabled);
		}
	}
}
