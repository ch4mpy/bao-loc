package com.c4_soft.bao_loc;

import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class SolutionsApi {
	public static void main(String[] args) {
		new SpringApplicationBuilder(SolutionsApi.class).web(WebApplicationType.SERVLET).run(args);
	}
}
