import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionRowComponent } from './solution-row.component';
import { SolutionService, SolutionResponse } from '../solution.service';
import { SolutionServiceMock } from '../solution.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { SolutionEditFormComponent } from '../solution-edit-form/solution-edit-form.component';


describe('SolutionRowComponent', () => {

  let component: SolutionRowComponent;
  let fixture: ComponentFixture<SolutionRowComponent>;
  let rootElement: HTMLElement;
  let solutionService: SolutionServiceMock;
  let router: Router;

  function rowCard(): HTMLElement {
    return rootElement.querySelector('mat-card');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionRowComponent ],
      providers: [
        { provide: SolutionService, useValue: new SolutionServiceMock() },
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionRowComponent);
    solutionService = TestBed.get(SolutionService);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    component.solution = new SolutionResponse(7, 2, 8, 9, 6, 5, 3, 1, 4);
    fixture.detectChanges();
    rootElement = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(rootElement.querySelector('mat-card')).toBeTruthy();
  });

  it('should update solution-service selected solution and navigate to edit when clicked', () => {
    rowCard().click();
    expect(solutionService.delegate.select).toHaveBeenCalledWith(component.solution);
    expect(router.getCurrentNavigation().extractedUrl.toString()).toEqual('/edit');
  });
});
