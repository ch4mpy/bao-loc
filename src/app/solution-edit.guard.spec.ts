import { TestBed, async, inject } from '@angular/core/testing';

import { SolutionEditGuard } from './solution-edit.guard';
import { SolutionService, SolutionResponse } from './solution.service';
import { SolutionServiceMock } from './test/solution.service.mock';
import { RouterTestingModule } from '@angular/router/testing';

describe('SolutionEditGuard', () => {
  let solutionService: SolutionServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SolutionEditGuard,
        { provide: SolutionService, useValue: new SolutionServiceMock() },
      ],
      imports: [
        RouterTestingModule,
      ]
    });

    solutionService = TestBed.get(SolutionService);
  });

  it('should prevent access when solution service has no active solution', inject([SolutionEditGuard], (guard: SolutionEditGuard) => {
    solutionService.selected.next(null);
    expect(guard.canActivate(null, null)).toBeFalsy();

    solutionService.selected.next(new SolutionResponse(7, 2, 8, 9, 6, 5, 3, 1, 4, { href: '/solutions/1' }));
    expect(guard.canActivate(null, null)).toBeTruthy();
  }));
});
