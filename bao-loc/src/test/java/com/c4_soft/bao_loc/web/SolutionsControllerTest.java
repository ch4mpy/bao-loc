package com.c4_soft.bao_loc.web;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;

import com.c4_soft.bao_loc.EnableSpringDataWebSupportTestConf;
import com.c4_soft.bao_loc.domain.ProblemService;
import com.c4_soft.bao_loc.domain.jpa.Player;
import com.c4_soft.bao_loc.domain.jpa.PlayerRepository;
import com.c4_soft.bao_loc.domain.jpa.Solution;
import com.c4_soft.bao_loc.domain.jpa.SolutionRepository;
import com.c4_soft.bao_loc.web.dtos.SolutionResponse;
import com.c4_soft.bao_loc.web.dtos.SolutionUpdateRequest;
import com.c4_soft.springaddons.security.oauth2.test.annotations.OpenId;
import com.c4_soft.springaddons.security.oauth2.test.annotations.OpenIdClaims;
import com.c4_soft.springaddons.security.oauth2.test.mockmvc.AutoConfigureSecurityAddons;
import com.c4_soft.springaddons.security.oauth2.test.mockmvc.MockMvcSupport;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
@WebMvcTest
@AutoConfigureSecurityAddons
@Import(EnableSpringDataWebSupportTestConf.class)
class SolutionsControllerTest {
	Player player;

	final ObjectMapper json = new ObjectMapper();

	@BeforeEach
	public void before() {
		player = new Player("54321", List.of(new Solution(6L, 4L, 2L, 3L, 5L, 9L, 1L, 8L, 7L), new Solution(8L, 2L, 1L, 3L, 4L, 5L, 9L, 6L, 7L)));
		player.getSolutions().get(0).setId(1L);
		player.getSolutions().get(0).setPlayer(player);
		player.getSolutions().get(1).setId(2L);
		player.getSolutions().get(1).setPlayer(player);
		when(playerRepo.findById(player.getSubject())).thenReturn(Optional.of(player));
		when(solutionRepo.findById(1L)).thenReturn(Optional.of(player.getSolutions().get(0)));
		when(solutionRepo.findById(2L)).thenReturn(Optional.of(player.getSolutions().get(1)));
		when(solutionRepo.findById(1L)).thenReturn(Optional.of(player.getSolutions().get(0)));
		when(solutionRepo.findByPlayerSubject(player.getSubject())).thenReturn(player.getSolutions());
	}

	@MockBean
	SolutionRepository solutionRepo;

	@MockBean
	PlayerRepository playerRepo;

	@MockBean
	ProblemService problemService;

	@MockBean
	SolutionMapper solutionMapper;

	@Autowired
	MockMvcSupport mockMvc;

	@Test
	@OpenId(claims = @OpenIdClaims(sub = "54321"))
	void whenGetSolutionsThenFirstPageIsReturned() throws Exception {
		final var s = player.getSolutions().get(0);
		when(solutionMapper.toDto(any(Solution.class)))
				.thenReturn(new SolutionResponse(s.getId(), s.getX1(), s.getX2(), s.getX3(), s.getX4(), s.getX5(), s.getX6(), s.getX7(), s.getX8(), s.getX9()));
		mockMvc.get("/solutions").andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(player.getSolutions().size())));
	}

	@Test
	@OpenId(claims = @OpenIdClaims(sub = "54321"))
	void whenGetSolutionByExistingIdThenItIsReturned() throws Exception {
		final var solution = player.getSolutions().get(1);
		when(solutionRepo.findById(1L)).thenReturn(Optional.of(solution));
		when(solutionMapper.toDto(any(Solution.class))).thenAnswer(invocation -> {
			final var s = (Solution) invocation.getArgument(0);
			return new SolutionResponse(s.getId(), s.getX1(), s.getX2(), s.getX3(), s.getX4(), s.getX5(), s.getX6(), s.getX7(), s.getX8(), s.getX9());
		});
		mockMvc.get("/solutions/1").andExpect(status().isOk()).andExpect(jsonPath("$.x1", is(solution.getX1().intValue())))
				.andExpect(jsonPath("$.x2", is(solution.getX2().intValue()))).andExpect(jsonPath("$.x3", is(solution.getX3().intValue())))
				.andExpect(jsonPath("$.x4", is(solution.getX4().intValue()))).andExpect(jsonPath("$.x5", is(solution.getX5().intValue())))
				.andExpect(jsonPath("$.x6", is(solution.getX6().intValue()))).andExpect(jsonPath("$.x7", is(solution.getX7().intValue())))
				.andExpect(jsonPath("$.x8", is(solution.getX8().intValue()))).andExpect(jsonPath("$.x9", is(solution.getX9().intValue())));
	}

	@Test
	@OpenId(claims = @OpenIdClaims(sub = "54321"))
	void whenGetSolutionByNonExistingIdThenNotFound() throws Exception {
		when(solutionRepo.findById(anyLong())).thenReturn(Optional.empty());
		mockMvc.get("/solutions/42").andExpect(status().isNotFound());
	}

	@Test
	@OpenId(claims = @OpenIdClaims(sub = "54321"))
	void whenPutValidSolutionAtValidIdThenAccepted() throws Exception {
		final var solution = player.getSolutions().get(1);
		final var payload = new SolutionUpdateRequest(1L, 2L, 3L, 4L, 5L, 6L, 7L, 8L, 9L);

		when(solutionRepo.findById(solution.getId())).thenReturn(Optional.of(solution));
		when(problemService.isAcceptable(solution)).thenReturn(true);

		mockMvc.put(payload, "/solutions/{solutionId}", solution.getId()).andExpect(status().isAccepted());
	}

	@Test
	@OpenId(claims = @OpenIdClaims(sub = "54321"))
	void whenPutSolutionWithDuplicatedValuesAtValidIdThenBadRequest() throws Exception {
		final var solution = player.getSolutions().get(1);
		final var payload = new SolutionUpdateRequest(1L, 2L, 3L, 4L, 5L, 6L, 7L, 8L, 8L);

		when(solutionRepo.findById(solution.getId())).thenReturn(Optional.of(solution));
		when(problemService.isAcceptable(solution)).thenReturn(false);

		mockMvc.put(payload, "/solutions/{solutionId}", solution.getId()).andExpect(status().isBadRequest());
	}

	@Test
	@OpenId(claims = @OpenIdClaims(sub = "54321"))
	void whenPutSolutionWithOutOfRangeValuesAtValidIdThenBadRequest() throws Exception {
		final var solution = player.getSolutions().get(1);
		final var payload = new SolutionUpdateRequest(1L, 2L, 3L, 4L, 5L, 6L, 7L, 8L, 10L);

		when(solutionRepo.findById(solution.getId())).thenReturn(Optional.of(solution));
		when(problemService.isAcceptable(solution)).thenReturn(false);

		mockMvc.put(payload, "/solutions/{solutionId}", solution.getId()).andExpect(status().isBadRequest());
	}

	@Test
	@OpenId(claims = @OpenIdClaims(sub = "54321"))
	void whenPutInvalidSolutionAtValidIdThenBadRequest() throws Exception {
		final var solution = player.getSolutions().get(1);
		final var payload = new SolutionUpdateRequest(1L, 2L, 3L, 4L, 5L, 6L, 7L, 8L, 9L);

		when(solutionRepo.findById(solution.getId())).thenReturn(Optional.of(solution));
		when(problemService.isAcceptable(solution)).thenReturn(false);

		mockMvc.put(payload, "/solutions/{solutionId}", solution.getId()).andExpect(status().isBadRequest());
	}

	@Test
	@OpenId(claims = @OpenIdClaims(sub = "54321"))
	void whenPutValidSolutionAtInvalidIdThenNotFound() throws Exception {
		final var payload = new SolutionUpdateRequest(1L, 2L, 3L, 4L, 5L, 6L, 7L, 8L, 9L);

		when(solutionRepo.findById(anyLong())).thenReturn(Optional.empty());

		mockMvc.put(payload, "/solutions/{solutionId}", 42L).andExpect(status().isNotFound());
	}

	@Test
	@OpenId(claims = @OpenIdClaims(sub = "54321"))
	void whenDelteSolutionAtValidIdThenItsActuallyDeleted() throws Exception {
		final var solution = player.getSolutions().get(1);

		when(solutionRepo.findById(solution.getId())).thenReturn(Optional.of(solution));

		mockMvc.delete("/solutions/{solutionId}", solution.getId()).andExpect(status().isAccepted());

		verify(solutionRepo).delete(solution);
	}

	@Test
	@OpenId(claims = @OpenIdClaims(sub = "54321"))
	void whenDelteSolutionAtInvalidIdThenNotFound() throws Exception {
		when(solutionRepo.findById(anyLong())).thenReturn(Optional.empty());

		mockMvc.delete("/solutions/42").andExpect(status().isNotFound());
	}
}
