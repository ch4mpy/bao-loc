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
  let rootElement: HTMLElement;
  const initialResponse = new SolutionResponse(4, 3, 9, 1, 7, 8, 5, 2, 6, { href: '/solutions/1' });

  function grid(): HTMLElement[][] {
    const table = [];
    for (let x = 0; x < 7; ++x) {
      table[x] = [];
    }
    const nodes = rootElement.querySelectorAll('mat-grid-tile') as NodeListOf<HTMLElement>;

    nodes.forEach((cell, nbr) => {
      const y = Math.floor(nbr / 7);
      const x = nbr - 7 * y;
      table[x][y] = cell;
    });

    return table;
  }

  function inputCells(): HTMLElement[] {
    const baoLocGrid = grid();
    return [
      baoLocGrid[0][0],
      baoLocGrid[0][4],
      baoLocGrid[1][5],
      baoLocGrid[2][4],
      baoLocGrid[2][0],
      baoLocGrid[4][0],
      baoLocGrid[4][4],
      baoLocGrid[5][5],
      baoLocGrid[6][4]];
  }

  function cellValue(cell: HTMLElement): number {
    const input = cell.querySelector('input') as HTMLInputElement;
    return +input.value;
  }

  function input(idx: number): HTMLInputElement {
    return inputCells()[idx].querySelector('input');
  }

  function editValue(idx: number, newValue: string) {
    input(idx).value = newValue;
    input(idx).dispatchEvent(new Event('input'));
    fixture.detectChanges();
    return fixture.whenStable();
  }

  function saveButton(): HTMLButtonElement {
    return rootElement.querySelector('button');
  }

  function result(): HTMLElement {
    return grid()[6][0];
  }

  function formErrors(): HTMLElement {
    return rootElement.querySelector('.form-errors');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SolutionEditFormComponent],
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
    solutionService.selected.next(initialResponse);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    rootElement = fixture.nativeElement;
  });

  it('should display the grid with solutions values int the right cells', () => {
    expect(inputCells().map(cell => cellValue(cell))).toEqual([4, 3, 9, 1, 7, 8, 5, 2, 6]);
    expect(result().textContent).toEqual('66');
  });

  it('should update the grid when solution-service active solution changes', () => {
    solutionService.selected.next(new SolutionResponse(7, 2, 8, 9, 6, 5, 3, 1, 4, { href: '/solutions/2' }));
    fixture.detectChanges();
    expect(inputCells().map(cell => cellValue(cell))).toEqual([7, 2, 8, 9, 6, 5, 3, 1, 4]);
  });

  it('should call solution-service when save button is clicked', () => {
    saveButton().click();
    expect(solutionService.delegate.update).toHaveBeenCalledWith(initialResponse);
  });

  it('should display an error and invalidate form when two values are equal', () => {
    editValue(0, input(8).value);
    expect(inputCells()[0].querySelector('mat-error').textContent).toBeTruthy();
    expect(inputCells()[8].querySelector('mat-error').textContent).toBeTruthy();
    expect(formErrors().textContent).toBeTruthy();
  });

  it('should display an error and invalidate form when a value is too low', () => {
    editValue(0, '0');
    expect(inputCells()[0].querySelector('mat-error').textContent).toBeTruthy();
    expect(formErrors().textContent).toBeTruthy();
  });

  it('should display an error and invalidate form when a value is too high', () => {
    editValue(0, '10');
    expect(inputCells()[0].querySelector('mat-error').textContent).toBeTruthy();
    expect(formErrors().textContent).toBeTruthy();
  });

});
