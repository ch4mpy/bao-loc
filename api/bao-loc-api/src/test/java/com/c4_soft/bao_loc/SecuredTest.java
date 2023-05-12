package com.c4_soft.bao_loc;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.context.annotation.Import;

import com.c4_soft.springaddons.security.oauth2.test.webmvc.jwt.AutoConfigureAddonsWebSecurity;

/**
 * Avoid MethodArgumentConversionNotSupportedException with repos MockBean
 *
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
@AutoConfigureAddonsWebSecurity
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Import({ SolutionsApi.WebSecurityConfig.class })
public @interface SecuredTest {

}