import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let rootElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
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

  it('should render a toolbar with a title and home icon', () => {
    expect(rootElement.querySelectorAll('mat-toolbar').length).toEqual(1);
    expect(rootElement.querySelector('mat-toolbar .header-title').textContent).toBeTruthy();
    expect(rootElement.querySelectorAll('mat-toolbar mat-icon').length).toEqual(1);
  });
});
