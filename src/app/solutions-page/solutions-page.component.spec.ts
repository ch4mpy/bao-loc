import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionsPageComponent } from './solutions-page.component';
import { SolutionService } from '../solution.service';
import { SolutionServiceMock } from '../solution.service.mock';

describe('SolutionsPageComponent', () => {
  let component: SolutionsPageComponent;
  let fixture: ComponentFixture<SolutionsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionsPageComponent ],
      providers: [
        { provide: SolutionService, useValue: new SolutionServiceMock() },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
