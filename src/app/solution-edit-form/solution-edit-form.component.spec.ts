import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionEditFormComponent } from './solution-edit-form.component';

describe('SolutionEditFormComponent', () => {
  let component: SolutionEditFormComponent;
  let fixture: ComponentFixture<SolutionEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionEditFormComponent ]
    })
    .compileComponents();
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
