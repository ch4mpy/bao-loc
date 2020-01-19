import { TestBed } from '@angular/core/testing';

import { SolutionService } from './solution.service';
import { HttpClientModule } from '@angular/common/http';

describe('SolutionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
    ]}));

  it('should be created', () => {
    const service: SolutionService = TestBed.get(SolutionService);
    expect(service).toBeTruthy();
  });
});
