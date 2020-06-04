package com.c4_soft.tests.baoloc.web;

import static com.c4_soft.tests.baoloc.web.RestdocsSupport.document;
import static com.c4_soft.tests.baoloc.web.RestdocsSupport.ignorePage;
import static com.c4_soft.tests.baoloc.web.RestdocsSupport.links;
import static com.c4_soft.tests.baoloc.web.RestdocsSupport.responseFields;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import com.c4_soft.tests.baoloc.domain.Problem;
import com.c4_soft.tests.baoloc.domain.ProblemService;
import com.c4_soft.tests.baoloc.domain.Solution;
import com.c4_soft.tests.baoloc.persistence.SolutionRepository;
import com.c4_soft.tests.baoloc.web.dto.SolutionResponse;
import com.c4_soft.tests.baoloc.web.dto.SolutionResponseAssembler;
import com.c4_soft.tests.baoloc.web.dto.SolutionUpdateRequest;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
@ExtendWith(SpringExtension.class)
@WebMvcTest(value = SolutionsController.class)
@AutoConfigureRestDocs
class SolutionsControllerTest {
	final List<Solution> savedSolutions =
			List.of(new Solution(6, 4, 2, 3, 5, 9, 1, 8, 7), new Solution(8, 2, 1, 3, 4, 5, 9, 6, 7));

	final ObjectMapper json = new ObjectMapper();

	@BeforeEach
	public void before() {
		savedSolutions.get(0).setId(1L);
		savedSolutions.get(1).setId(2L);
	}

	@MockBean
	SolutionRepository solutionRepo;

	@MockBean
	ProblemService problemService;

	@MockBean
	Problem problem;

	@MockBean
	SolutionResponseAssembler solutionResponseAssembler;

	@Autowired
	MockMvc mockMvc;

	@Test
	void whenGetSolutionsThenFirstPageIsReturned() throws Exception {
		when(problemService.getSolutions(any())).thenReturn(new PageImpl<>(savedSolutions));
		final var s = savedSolutions.get(0);
		when(solutionResponseAssembler.toModel(any(Solution.class))).thenReturn(
				new SolutionResponse(
						s.getX1(),
						s.getX2(),
						s.getX3(),
						s.getX4(),
						s.getX5(),
						s.getX6(),
						s.getX7(),
						s.getX8(),
						s.getX9()));
		mockMvc.perform(get("/solutions"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$._embedded.solutionResponseList", hasSize(savedSolutions.size())))
				.andExpect(jsonPath("$.page.totalElements", is(savedSolutions.size())))
				.andDo(document("solutions-collection", ignorePage(responseFields(), "solutionResponseList"), links()));
	}

	@Test
	void whenGetSolutionByExistingIdThenItIsReturned() throws Exception {
		final var solution = savedSolutions.get(1);
		when(solutionRepo.findById(1L)).thenReturn(Optional.of(solution));
		when(solutionResponseAssembler.toModel(any(Solution.class))).thenAnswer(invocation -> {
			final var s = (Solution) invocation.getArgument(0);
			return new SolutionResponse(
					s.getX1(),
					s.getX2(),
					s.getX3(),
					s.getX4(),
					s.getX5(),
					s.getX6(),
					s.getX7(),
					s.getX8(),
					s.getX9());
		});
		mockMvc.perform(get("/solutions/1"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.x1", is(solution.getX1().intValue())))
				.andExpect(jsonPath("$.x2", is(solution.getX2().intValue())))
				.andExpect(jsonPath("$.x3", is(solution.getX3().intValue())))
				.andExpect(jsonPath("$.x4", is(solution.getX4().intValue())))
				.andExpect(jsonPath("$.x5", is(solution.getX5().intValue())))
				.andExpect(jsonPath("$.x6", is(solution.getX6().intValue())))
				.andExpect(jsonPath("$.x7", is(solution.getX7().intValue())))
				.andExpect(jsonPath("$.x8", is(solution.getX8().intValue())))
				.andExpect(jsonPath("$.x9", is(solution.getX9().intValue())))
				.andDo(
						document(
								"solution",
								responseFields(
										fieldWithPath("x1").description("unique, not null, between 1 and 9"),
										fieldWithPath("x2").description("unique, not null, between 1 and 9"),
										fieldWithPath("x3").description("unique, not null, between 1 and 9"),
										fieldWithPath("x4").description("unique, not null, between 1 and 9"),
										fieldWithPath("x5").description("unique, not null, between 1 and 9"),
										fieldWithPath("x6").description("unique, not null, between 1 and 9"),
										fieldWithPath("x7").description("unique, not null, between 1 and 9"),
										fieldWithPath("x8").description("unique, not null, between 1 and 9"),
										fieldWithPath("x9").description("unique, not null, between 1 and 9")),
								links()));
	}

	@Test
	void whenGetSolutionByNonExistingIdThenNotFound() throws Exception {
		when(solutionRepo.findById(anyLong())).thenReturn(Optional.empty());
		mockMvc.perform(get("/solutions/42")).andExpect(status().isNotFound());
	}

	@Test
	void whenPutValidSolutionAtValidIdThenAccepted() throws Exception {
		final var solution = savedSolutions.get(1);
		final var payload = new SolutionUpdateRequest(1L, 2L, 3L, 4L, 5L, 6L, 7L, 8L, 9L);

		when(solutionRepo.findById(solution.getId())).thenReturn(Optional.of(solution));
		when(problem.isAcceptable(solution)).thenReturn(true);

		mockMvc.perform(
				put("/solutions/{solutionId}", solution.getId()).characterEncoding("UTF-8")
						.contentType(MediaType.APPLICATION_JSON)
						.content(json.writeValueAsBytes(payload)))
				.andExpect(status().isAccepted())
				.andDo(
						document(
								"solution-update",
								requestFields(
										fieldWithPath("x1").description("unique, not null, between 1 and 9"),
										fieldWithPath("x2").description("unique, not null, between 1 and 9"),
										fieldWithPath("x3").description("unique, not null, between 1 and 9"),
										fieldWithPath("x4").description("unique, not null, between 1 and 9"),
										fieldWithPath("x5").description("unique, not null, between 1 and 9"),
										fieldWithPath("x6").description("unique, not null, between 1 and 9"),
										fieldWithPath("x7").description("unique, not null, between 1 and 9"),
										fieldWithPath("x8").description("unique, not null, between 1 and 9"),
										fieldWithPath("x9").description("unique, not null, between 1 and 9"))));
	}

	@Test
	void whenPutSolutionWithDuplicatedValuesAtValidIdThenBadRequest() throws Exception {
		final var solution = savedSolutions.get(1);
		final var payload = new SolutionUpdateRequest(1L, 2L, 3L, 4L, 5L, 6L, 7L, 8L, 8L);

		when(solutionRepo.findById(solution.getId())).thenReturn(Optional.of(solution));
		when(problem.isAcceptable(solution)).thenReturn(false);

		mockMvc.perform(
				put("/solutions/{solutionId}", solution.getId()).characterEncoding("UTF-8")
						.contentType(MediaType.APPLICATION_JSON)
						.content(json.writeValueAsBytes(payload)))
				.andExpect(status().isBadRequest());
	}

	@Test
	void whenPutSolutionWithOutOfRangeValuesAtValidIdThenBadRequest() throws Exception {
		final var solution = savedSolutions.get(1);
		final var payload = new SolutionUpdateRequest(1L, 2L, 3L, 4L, 5L, 6L, 7L, 8L, 10L);

		when(solutionRepo.findById(solution.getId())).thenReturn(Optional.of(solution));
		when(problem.isAcceptable(solution)).thenReturn(false);

		mockMvc.perform(
				put("/solutions/{solutionId}", solution.getId()).characterEncoding("UTF-8")
						.contentType(MediaType.APPLICATION_JSON)
						.content(json.writeValueAsBytes(payload)))
				.andExpect(status().isBadRequest());
	}

	@Test
	void whenPutInvalidSolutionAtValidIdThenBadRequest() throws Exception {
		final var solution = savedSolutions.get(1);
		final var payload = new SolutionUpdateRequest(1L, 2L, 3L, 4L, 5L, 6L, 7L, 8L, 9L);

		when(solutionRepo.findById(solution.getId())).thenReturn(Optional.of(solution));
		when(problem.isAcceptable(solution)).thenReturn(false);

		mockMvc.perform(
				put("/solutions/{solutionId}", solution.getId()).characterEncoding("UTF-8")
						.contentType(MediaType.APPLICATION_JSON)
						.content(json.writeValueAsBytes(payload)))
				.andExpect(status().isBadRequest());
	}

	@Test
	void whenPutValidSolutionAtInvalidIdThenNotFound() throws Exception {
		final var payload = new SolutionUpdateRequest(1L, 2L, 3L, 4L, 5L, 6L, 7L, 8L, 9L);

		when(solutionRepo.findById(anyLong())).thenReturn(Optional.empty());

		mockMvc.perform(
				put("/solutions/{solutionId}", 42L).characterEncoding("UTF-8")
						.contentType(MediaType.APPLICATION_JSON)
						.content(json.writeValueAsBytes(payload)))
				.andExpect(status().isNotFound());
	}

	@Test
	void whenDelteSolutionAtValidIdThenItsActuallyDeleted() throws Exception {
		final var solution = savedSolutions.get(1);

		when(solutionRepo.findById(solution.getId())).thenReturn(Optional.of(solution));

		mockMvc.perform(delete("/solutions/{solutionId}", solution.getId()))
				.andExpect(status().isAccepted())
				.andDo(document("delete"));

		verify(solutionRepo).delete(solution);
	}

	@Test
	void whenDelteSolutionAtInvalidIdThenNotFound() throws Exception {
		when(solutionRepo.findById(anyLong())).thenReturn(Optional.empty());

		mockMvc.perform(delete("/solutions/42")).andExpect(status().isNotFound());
	}

	@Test
	void whenDelteAllThenAllSolutionsAreActuallyDeleted() throws Exception {
		mockMvc.perform(delete("/solutions")).andExpect(status().isAccepted()).andDo(document("delete-all"));
		verify(solutionRepo).deleteAll();
	}

}
