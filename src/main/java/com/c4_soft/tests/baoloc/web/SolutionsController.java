package com.c4_soft.tests.baoloc.web;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.c4_soft.tests.baoloc.domain.Problem;
import com.c4_soft.tests.baoloc.domain.ProblemService;
import com.c4_soft.tests.baoloc.domain.Solution;
import com.c4_soft.tests.baoloc.persistence.SolutionRepository;
import com.c4_soft.tests.baoloc.web.dto.SolutionResponse;
import com.c4_soft.tests.baoloc.web.dto.SolutionResponseAssembler;
import com.c4_soft.tests.baoloc.web.dto.SolutionUpdateRequest;
import com.sun.istack.NotNull;

/**
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
@RestController
@RequestMapping("/solutions")
public class SolutionsController {

	private final ProblemService pbService;
	private final SolutionResponseAssembler solutionAssembler;
	private final PagedResourcesAssembler<Solution> solutionPageAssembler;
	private final SolutionRepository solutionRepo;
	private final Problem problem;

	public SolutionsController(
			ProblemService pbService,
			SolutionResponseAssembler solutionAssembler,
			PagedResourcesAssembler<Solution> solutionPageAssembler,
			SolutionRepository solutionRepo,
			Problem problem) {
		super();
		this.pbService = pbService;
		this.solutionAssembler = solutionAssembler;
		this.solutionPageAssembler = solutionPageAssembler;
		this.solutionRepo = solutionRepo;
		this.problem = problem;
	}

	@GetMapping()
	public ResponseEntity<PagedModel<SolutionResponse>> getPage(Pageable pageable) {
		final var solutions = pbService.getSolutions(pageable);
		final var payload = solutionPageAssembler.toModel(solutions, solutionAssembler);
		return ResponseEntity.ok(payload);
	}

	@GetMapping("/{solutionId}")
	public ResponseEntity<SolutionResponse> get(@PathVariable @NotNull Long solutionId) {
		final var solution = solutionRepo.findById(solutionId)
				.map(solutionAssembler::toModel)
				.orElseThrow(() -> new EntityNotFoundException("no solution with ID: " + solutionId));
		return ResponseEntity.ok(solution);
	}

	@PutMapping("/{solutionId}")
	public ResponseEntity<?>
			update(@PathVariable @NotNull Long solutionId, @RequestBody @Valid SolutionUpdateRequest payload) {
		final var solution = solutionRepo.findById(solutionId)
				.orElseThrow(() -> new EntityNotFoundException("no solution with ID: " + solutionId));

		solution.setX1(payload.x1);
		solution.setX2(payload.x2);
		solution.setX3(payload.x3);
		solution.setX4(payload.x4);
		solution.setX5(payload.x5);
		solution.setX6(payload.x6);
		solution.setX7(payload.x7);
		solution.setX8(payload.x8);
		solution.setX9(payload.x9);

		if (problem.isAcceptable(solution)) {
			solutionRepo.save(solution);
			return ResponseEntity.accepted().build();
		}

		return ResponseEntity.badRequest().build();
	}

	@DeleteMapping("/{solutionId}")
	public ResponseEntity<?> deleteOne(@PathVariable @NotNull Long solutionId) {
		final var solution = solutionRepo.findById(solutionId)
				.orElseThrow(() -> new EntityNotFoundException("no solution with ID: " + solutionId));

		solutionRepo.delete(solution);

		return ResponseEntity.accepted().build();
	}

	@DeleteMapping()
	public ResponseEntity<?> deleteAll() {
		solutionRepo.deleteAll();

		return ResponseEntity.accepted().build();
	}
}
