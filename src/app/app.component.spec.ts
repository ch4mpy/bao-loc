import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

/**
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
describe('AppComponent', () => {
  let component: AppComponent;
  let rootElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    rootElement = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render a toolbar with a title', () => {
    expect(rootElement.querySelectorAll('mat-toolbar').length).toEqual(1);
    expect(rootElement.querySelector('mat-toolbar .header-title').textContent).toBeTruthy();
  });

  it('should render solutions page widget and solution edit widget', () => {
    expect(rootElement.querySelectorAll('app-solutions-page').length).toEqual(1);
    expect(rootElement.querySelectorAll('app-solution-edit-form').length).toEqual(1);
  });
});
