import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SolutionService } from '../solution.service';
import { MocksModule, SolutionsFixture } from '../test/mocks.module';
import { SolutionServiceMock } from '../test/solution.service.mock';
import { SolutionsPageComponent } from './solutions-page.component';

/**
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
describe('SolutionsPageComponent', () => {

  let component: SolutionsPageComponent;
  let fixture: ComponentFixture<SolutionsPageComponent>;
  let rootElement: HTMLElement;
  let solutionService: SolutionServiceMock;
  const solutionsFixture = new SolutionsFixture();

  function display(): HTMLElement {
    return rootElement.querySelector('mat-card.solutions-display');
  }

  function rows(): NodeListOf<HTMLElement> {
    return display().querySelectorAll('app-solution-row');
  }

  function firstPageButton(): HTMLButtonElement {
    return display().querySelector('button.first');
  }

  function prevPageButton(): HTMLButtonElement {
    return display().querySelector('button.prev');
  }

  function nextPageButton(): HTMLButtonElement {
    return display().querySelector('button.next');
  }

  function lastPageButton(): HTMLButtonElement {
    return display().querySelector('button.last');
  }

  function actions(): HTMLElement {
    return rootElement.querySelector('mat-card.solutions-actions');
  }

  function reloadButton(): HTMLButtonElement {
    return actions().querySelector('.restore-button');
  }

  function deleteButton(): HTMLButtonElement {
    return actions().querySelector('.delete-button');
  }

  function reload() {
    solutionService.delegate.deleteAll.and.returnValue(of().subscribe());
    solutionService.delegate.getPage.and.returnValue(of(solutionsFixture.getPage(0, 3)));
    reloadButton().click();
    fixture.detectChanges();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SolutionsPageComponent],
      providers: [
        { provide: SolutionService, useValue: new SolutionServiceMock() }
      ],
      imports: [
        MocksModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    solutionService = TestBed.get(SolutionService);
    solutionService.delegate.getPage.and.returnValue(of(solutionsFixture.getPage(0, 3)));
    fixture = TestBed.createComponent(SolutionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    rootElement = fixture.nativeElement;
  });

  it('should render display and actions', () => {
    expect(display()).toBeTruthy();
    expect(actions()).toBeTruthy();
  });

  it('should erase existing results and get first page when reload button is clicked', () => {
    reload();
    expect(solutionService.delegate.deleteAll).toHaveBeenCalledTimes(1);
    expect(solutionService.delegate.getPage).toHaveBeenCalledWith(0);
    expect(rows().length).toEqual(solutionsFixture.solutions.length);
  });

  it('should navigate beween pages when navigation buttons are clicked', () => {
    reload();

    // move to page 2/3
    solutionService.delegate.getPage.and.returnValue(of(solutionsFixture.getPage(1, 3)));
    nextPageButton().click();
    fixture.detectChanges();

    // move to page 3/3
    solutionService.delegate.getPage.and.returnValue(of(solutionsFixture.getPage(2, 3)));
    nextPageButton().click();
    fixture.detectChanges();

    // back to page 2/3
    solutionService.delegate.getPage.and.returnValue(of(solutionsFixture.getPage(1, 3)));
    prevPageButton().click();
    fixture.detectChanges();

    // move to page 3/3 again
    solutionService.delegate.getPage.and.returnValue(of(solutionsFixture.getPage(2, 3)));
    nextPageButton().click();
    fixture.detectChanges();

    // back to page 1/3
    solutionService.delegate.getPage.and.returnValue(of(solutionsFixture.getPage(0, 3)));
    firstPageButton().click();
    fixture.detectChanges();

    // fast forward to page 3/3
    solutionService.delegate.getPage.and.returnValue(of(solutionsFixture.getPage(2, 3)));
    lastPageButton().click();
    fixture.detectChanges();

    expect(solutionService.delegate.getPage).toHaveBeenCalledTimes(8);
    expect(solutionService.delegate.getPage.calls.all()[0].args[0]).toEqual(0);
    expect(solutionService.delegate.getPage.calls.all()[1].args[0]).toEqual(0);
    expect(solutionService.delegate.getPage.calls.all()[2].args[0]).toEqual(1);
    expect(solutionService.delegate.getPage.calls.all()[3].args[0]).toEqual(2);
    expect(solutionService.delegate.getPage.calls.all()[4].args[0]).toEqual(1);
    expect(solutionService.delegate.getPage.calls.all()[5].args[0]).toEqual(2);
    expect(solutionService.delegate.getPage.calls.all()[6].args[0]).toEqual(0);
    expect(solutionService.delegate.getPage.calls.all()[7].args[0]).toEqual(2);
  });

  it('should do noting when previous page button is clicked on first page', () => {
    reload();

    // this shouldn't be called
    solutionService.delegate.getPage.and.returnValue(of(solutionsFixture.getPage(-1, 3)));
    prevPageButton().click();
    fixture.detectChanges();

    // first page at "load" and "reload"
    expect(solutionService.delegate.getPage).toHaveBeenCalledTimes(2);
  });

  it('should do noting when next page button is clicked on last page', () => {
    reload();

    solutionService.delegate.getPage.and.returnValue(of(solutionsFixture.getPage(2, 3)));
    lastPageButton().click();
    fixture.detectChanges();

    // this shouldn't be called
    solutionService.delegate.getPage.and.returnValue(of(solutionsFixture.getPage(3, 3)));
    nextPageButton().click();
    fixture.detectChanges();

    // first page at "load", "reload" and then last page
    expect(solutionService.delegate.getPage).toHaveBeenCalledTimes(3);
  });

  it('should trigger solutions deletion when trash button is clicked', () => {
    reload();

    deleteButton().click();
    fixture.detectChanges();

    expect(rows().length).toEqual(0);
    expect(solutionService.delegate.deleteAll).toHaveBeenCalledTimes(2);
  });
});
