import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { SolutionPage, SolutionResponse, SolutionService, SolutionUpdateRequest } from './solution.service';

export class SolutionServiceMock {

    public selected = new BehaviorSubject<SolutionResponse>(null);

    public delegate = jasmine.createSpyObj<SolutionService>(['getPage', 'update', 'delete', 'deleteAll']);

    getPage(pageNumber = 0): Observable<SolutionPage> {
        return this.delegate.getPage(pageNumber);
    }

    update(from: SolutionResponse, to: SolutionUpdateRequest): Subscription {
        return this.delegate.update(from, to);
    }

    delete(solution: SolutionResponse): Subscription {
        return this.delegate.delete(solution);
    }

    deleteAll(): Subscription {
        return this.delegate.deleteAll();
    }
}
