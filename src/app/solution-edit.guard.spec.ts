import { TestBed, async, inject } from '@angular/core/testing';

import { SolutionEditGuard } from './solution-edit.guard';

describe('SolutionEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SolutionEditGuard]
    });
  });

  it('should ...', inject([SolutionEditGuard], (guard: SolutionEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
