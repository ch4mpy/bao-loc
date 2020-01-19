import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SolutionResponse, SolutionService } from '../solution.service';
import { SolutionServiceMock } from '../test/solution.service.mock';
import { SolutionEditFormComponent } from './solution-edit-form.component';


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
