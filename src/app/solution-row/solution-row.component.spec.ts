import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionRowComponent } from './solution-row.component';
import { SolutionService, SolutionResponse } from '../solution.service';
import { SolutionServiceMock } from '../solution.service.mock';
import { RouterTestingModule } from '@angular/router/testing';

describe('SolutionRowComponent', () => {
  let component: SolutionRowComponent;
  let fixture: ComponentFixture<SolutionRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionRowComponent ],
      providers: [
        { provide: SolutionService, useValue: new SolutionServiceMock() },
      ],
      imports: [
        RouterTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionRowComponent);
    component = fixture.componentInstance;
    component.solution = new SolutionResponse(7, 2, 8, 9, 6, 5, 3, 1, 4);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
