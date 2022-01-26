import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SolutionResponse, SolutionService } from '../solution.service';
import { SolutionServiceMock } from '../test/solution.service.mock';
import { SolutionRowComponent } from './solution-row.component';

/**
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
describe('SolutionRowComponent', () => {

  let component: SolutionRowComponent;
  let fixture: ComponentFixture<SolutionRowComponent>;
  let rootElement: HTMLElement;
  let solutionService: SolutionServiceMock;

  function rowCard(): HTMLElement {
    return rootElement.querySelector('mat-card');
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SolutionRowComponent],
      providers: [
        { provide: SolutionService, useValue: new SolutionServiceMock() },
      ],
      imports: [
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionRowComponent);
    solutionService = TestBed.get(SolutionService);
    component = fixture.componentInstance;
    component.solution = new SolutionResponse(7, 2, 8, 9, 6, 5, 3, 1, 4);
    fixture.detectChanges();
    rootElement = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(rootElement.querySelector('mat-card')).toBeTruthy();
  });

  it('should update solution-service selected solution when clicked', () => {
    rowCard().click();
    expect(solutionService.delegate.select).toHaveBeenCalledWith(component.solution);
  });
});
