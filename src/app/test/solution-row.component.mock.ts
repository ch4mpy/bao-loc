import { Input, Component } from '@angular/core';
import { SolutionResponse } from '../solution.service';

@Component({
    selector: 'app-solution-row',
    template: `<div id="mock-solution-row">
      {{solution.x1}},
      {{solution.x2}},
      {{solution.x3}},
      {{solution.x4}},
      {{solution.x5}},
      {{solution.x6}},
      {{solution.x7}},
      {{solution.x8}},
      {{solution.x9}}</div>`,
    styles: []
  })
  export class MockSolutionRowComponent {
    @Input() solution: SolutionResponse;
  }
