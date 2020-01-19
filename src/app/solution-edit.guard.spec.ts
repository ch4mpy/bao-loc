import { TestBed, async, inject } from '@angular/core/testing';

import { SolutionEditGuard } from './solution-edit.guard';
import { SolutionService } from './solution.service';
import { SolutionServiceMock } from './test/solution.service.mock';
import { RouterTestingModule } from '@angular/router/testing';

describe('SolutionEditGuard', () => {
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
  });

  it('should ...', inject([SolutionEditGuard], (guard: SolutionEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
