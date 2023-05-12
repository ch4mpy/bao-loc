package com.c4_soft.bao_loc.web;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.micrometer.observation.annotation.Observed;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/v1/users")
@Tag(name = "Users")
@Observed
public class UsersController {

	@GetMapping("/{username}/roles")
	@PreAuthorize("hasAuthority('read:user-roles')")
	public UserRolesDto getUserRoles(@PathVariable("username") String username) {
		return new UserRolesDto(List.of("machin", "truc"));
	}

	public static record UserRolesDto(List<String> authorities) {
	}
}
