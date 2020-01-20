import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PageMeta } from './page';

export class SolutionUpdateRequest {
  constructor(
    public x1: number,
    public x2: number,
    public x3: number,
    public x4: number,
    public x5: number,
    public x6: number,
    public x7: number,
    public x8: number,
    public x9: number) { }
}

export class SolutionResponse {
  constructor(
    public x1: number,
    public x2: number,
    public x3: number,
    public x4: number,
    public x5: number,
    public x6: number,
    public x7: number,
    public x8: number,
    public x9: number,
    readonly _links: any = {}) { }
}

export class SolutionPageContent {
  constructor(
    readonly solutionResponseList: Array<SolutionResponse>) { }
}

export class SolutionPage {
  constructor(
    readonly _embedded: SolutionPageContent,
    readonly _links: any,
    readonly page: PageMeta) { }
}

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  public pageSize = 5;

  private selected$ = new BehaviorSubject<SolutionResponse>(null);

  constructor(private http: HttpClient) { }

  get selected(): Observable<SolutionResponse> {
    return this.selected$;
  }

  select(solution: SolutionResponse) {
    this.selected$.next(solution);
  }

  getPage(pageNumber = 0): Observable<SolutionPage> {
    const params = new HttpParams()
      .set('page', pageNumber.toString())
      .set('size', this.pageSize.toString());

    return this.http.get<SolutionPage>('/solutions', { params });
  }

  update(solution: SolutionResponse): Subscription {
    return this.http.put(solution._links['self']['href'], new SolutionUpdateRequest(
      solution.x1,
      solution.x2,
      solution.x3,
      solution.x4,
      solution.x5,
      solution.x6,
      solution.x7,
      solution.x8,
      solution.x9)).subscribe();
  }

  deleteAll(): Subscription {
    this.selected$.next(null);
    return this.http.delete('/solutions').subscribe();
  }
}
