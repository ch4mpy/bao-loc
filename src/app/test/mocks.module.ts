import { NgModule } from '@angular/core';
import { MockSolutionRowComponent } from './solution-row.component.mock';
import { CommonModule } from '@angular/common';
import { SolutionPage } from '../solution.service';
import { MockSolutionEditFormComponent } from './solution-edit-form.component.mock';

export class SolutionsFixture {
    public solutions = [
        this.solution(6, 4, 2, 3, 5, 9, 1, 8, 7, 1),
        this.solution(8, 2, 1, 3, 4, 5, 9, 6, 7, 2)
    ];

    getPage(num = 0, total = 1): SolutionPage {
        return {
          _embedded : {
            solutionResponseList : this.solutions
          },
          _links : {
            self : {
              href : 'http://localhost:8080/solutions'
            }
          },
          page : {
            size : this.solutions.length,
            totalElements : this.solutions.length,
            totalPages : total,
            number : num
          }
        };
      }

    private solution(x1, x2, x3, x4, x5, x6, x7, x8, x9, id) {
        return {x1, x2, x3, x4, x5, x6, x7, x8, x9, _links : {
                self : {
                    href : `http://localhost:8080/solutions/${id}`
                }
            }
        };
    }

}

@NgModule({
    declarations: [
      MockSolutionRowComponent,
      MockSolutionEditFormComponent,
    ], exports: [
        MockSolutionRowComponent,
        MockSolutionEditFormComponent,
    ], imports: [
      CommonModule
    ],
  })
  export class MocksModule {
  }
