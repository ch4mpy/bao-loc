import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionRowComponent } from './solution-row.component';

describe('SolutionRowComponent', () => {
  let component: SolutionRowComponent;
  let fixture: ComponentFixture<SolutionRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
