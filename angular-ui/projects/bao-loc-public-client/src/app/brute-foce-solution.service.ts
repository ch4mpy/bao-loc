import { EventEmitter, Injectable } from '@angular/core';
import { SolutionService } from '@c4-soft/bao-loc-commons';
import { Solution } from '@c4-soft/bao-loc-domain';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

@Injectable({
  providedIn: 'root',
})
export class BruteForceSolutionService implements SolutionService {
  getAllSolutions(): Promise<Solution[]> {
    if (typeof Worker !== 'undefined') {
      const solution$ = new EventEmitter<Solution[]>();
      const worker = new Worker(new URL('./solver.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        solution$.emit(data);
        solution$.complete();
      };
      worker.postMessage({});
      return lastValueFrom(solution$);
    } else {
      return new Promise(() => {
        const solutions: Solution[] = [];
        Solution.explore([1, 2, 3, 4, 5, 6, 7, 8, 9], [], solutions);
        return solutions;
      });
    }
  }
}
