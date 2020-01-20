import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { SolutionPage, SolutionResponse, SolutionService } from '../solution.service';

export class SolutionServiceMock {

    public selected = new BehaviorSubject<SolutionResponse>(null);

    public delegate = jasmine.createSpyObj<SolutionService>(['select', 'getPage', 'update', 'delete', 'deleteAll']);

    getPage(pageNumber): Observable<SolutionPage> {
        return this.delegate.getPage(pageNumber);
    }

    update(from: SolutionResponse): Subscription {
        return this.delegate.update(from);
    }

    deleteAll(): Subscription {
        return this.delegate.deleteAll();
    }

    select(solution: SolutionResponse) {
        return this.delegate.select(solution);
    }
}
