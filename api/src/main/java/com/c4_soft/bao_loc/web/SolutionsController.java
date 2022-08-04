package com.c4_soft.bao_loc.web;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.c4_soft.bao_loc.domain.ProblemService;
import com.c4_soft.bao_loc.domain.jpa.Player;
import com.c4_soft.bao_loc.domain.jpa.PlayerRepository;
import com.c4_soft.bao_loc.domain.jpa.Solution;
import com.c4_soft.bao_loc.domain.jpa.SolutionRepository;
import com.c4_soft.bao_loc.exceptions.NotAcceptableSolutionException;
import com.c4_soft.bao_loc.web.dtos.SolutionResponse;
import com.c4_soft.bao_loc.web.dtos.SolutionUpdateRequest;
import com.c4_soft.springaddons.security.oauth2.OAuthentication;
import com.c4_soft.springaddons.security.oauth2.OpenidClaimSet;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.RequiredArgsConstructor;

/**
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
@RestController
@RequestMapping("/solutions")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class SolutionsController {

	private final SolutionMapper solutionMapper;
	private final SolutionRepository solutionRepo;
	private final PlayerRepository playerRepo;
	private final ProblemService problemService;

	@GetMapping()
	public List<SolutionResponse> retrievePlayerSolutions(OAuthentication<OpenidClaimSet> auth) {
		return solutionRepo.findByPlayerSubject(auth.getName()).stream().map(solutionMapper::toDto).collect(Collectors.toList());
	}

	@PostMapping()
	public ResponseEntity<?> createSolution(@RequestBody @Valid SolutionUpdateRequest dto, OAuthentication<OpenidClaimSet> auth) {
		var player = playerRepo.findById(auth.getName()).orElseGet(() -> playerRepo.save(new Player(auth.getName(), List.of())));
		var solution = solutionMapper.toDomain(dto);
		solution.setPlayer(player);
		if (!problemService.isAcceptable(solution)) {
			throw new NotAcceptableSolutionException();
		}
		return ResponseEntity.accepted().header(HttpHeaders.LOCATION, String.format("/bao-loc/%s", solutionRepo.save(solution).getId())).build();
	}

	@GetMapping("/{solutionId}")
	@PreAuthorize("hasAuthority('ADMIN') or is(#solution.player.subject)")
	public SolutionResponse retrieveSolution(
			@PathVariable("solutionId") @Parameter(
					name = "solutionId",
					in = ParameterIn.PATH,
					required = true,
					schema = @Schema(type = "long")) Solution solution) {
		return solutionMapper.toDto(solution);
	}

	@PutMapping("/{solutionId}")
	@PreAuthorize("hasAuthority('ADMIN') or is(#solution.player.subject)")
	public ResponseEntity<?> updateSolution(
			@PathVariable("solutionId") @Parameter(
					name = "solutionId",
					in = ParameterIn.PATH,
					required = true,
					schema = @Schema(type = "long")) Solution solution,
			@RequestBody @Valid SolutionUpdateRequest payload,
			OAuthentication<OpenidClaimSet> auth) {
		solution.setX1(payload.x1);
		solution.setX2(payload.x2);
		solution.setX3(payload.x3);
		solution.setX4(payload.x4);
		solution.setX5(payload.x5);
		solution.setX6(payload.x6);
		solution.setX7(payload.x7);
		solution.setX8(payload.x8);
		solution.setX9(payload.x9);
		if (!problemService.isAcceptable(solution)) {
			throw new NotAcceptableSolutionException();
		}
		solutionRepo.save(solution);

		return ResponseEntity.accepted().build();
	}

	@DeleteMapping("/{solutionId}")
	@PreAuthorize("hasAuthority('ADMIN') or is(#solution.player.subject)")
	public ResponseEntity<?> deleteSolution(
			@PathVariable("solutionId") @Parameter(
					name = "solutionId",
					in = ParameterIn.PATH,
					required = true,
					schema = @Schema(type = "long")) Solution solution,
			OAuthentication<OpenidClaimSet> auth) {
		solutionRepo.delete(solution);

		return ResponseEntity.accepted().build();
	}
}
