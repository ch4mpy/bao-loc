import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionEditFormComponent } from './solution-edit-form.component';
import { SolutionService, SolutionResponse } from '../solution.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { SolutionServiceMock } from '../solution.service.mock';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SolutionEditFormComponent', () => {
  let component: SolutionEditFormComponent;
  let fixture: ComponentFixture<SolutionEditFormComponent>;
  let solutionService: SolutionServiceMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionEditFormComponent ],
      providers: [
        { provide: SolutionService, useValue: new SolutionServiceMock() },
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
      ]
    })
    .compileComponents();
    solutionService = TestBed.get(SolutionService);
    solutionService.selected.next(new SolutionResponse(4, 3, 9, 1, 7, 8, 5, 2, 6, { href: '/solutions/1' }));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
