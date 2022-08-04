package com.c4_soft.bao_loc;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.context.annotation.Import;

import com.c4_soft.bao_loc.SolutionsApi.WebSecurityConfig;
import com.c4_soft.springaddons.security.oauth2.config.synchronised.ServletSecurityBeans;
import com.c4_soft.springaddons.security.oauth2.test.mockmvc.AddonsWebmvcTestConf;
import com.c4_soft.springaddons.security.oauth2.test.mockmvc.AutoConfigureSecurityAddons;

/**
 * Avoid MethodArgumentConversionNotSupportedException with repos MockBean
 *
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
@Import(WebSecurityConfig.class)
@AutoConfigureSecurityAddons
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@ImportAutoConfiguration(classes = { AddonsWebmvcTestConf.class, ServletSecurityBeans.class })
public @interface SecuredTest {

}