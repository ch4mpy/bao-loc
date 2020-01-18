import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PageLinks, PageMeta } from './page';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';

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
    public x9: number) {}
}

export class SolutionResponse {
  constructor(
    readonly x1: number,
    readonly x2: number,
    readonly x3: number,
    readonly x4: number,
    readonly x5: number,
    readonly x6: number,
    readonly x7: number,
    readonly x8: number,
    readonly x9: number,
    readonly _links: any = {}) {}
}

export class SolutionPageContent {
  constructor(
      readonly solutionResponseList: Array<SolutionResponse>) { }
}

export class SolutionPage {
    constructor(
        readonly _embedded: SolutionPageContent,
        readonly _links: PageLinks,
        readonly page: PageMeta) { }
}

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  public pageSize = 5;

  readonly selected$ = new BehaviorSubject<SolutionResponse>(null);

  constructor(private http: HttpClient) { }

  getPage(pageNumber = 0): Observable<SolutionPage> {
    const params = new HttpParams()
      .set('page', pageNumber.toString())
      .set('size', this.pageSize.toString());

    return this.http.get<SolutionPage>('/solutions', { params });
  }

  update(from: SolutionResponse, to: SolutionUpdateRequest): Subscription {
    return this.http.put(from._links['self']['href'], to).subscribe();
  }

  delete(solution: SolutionResponse): Subscription {
    return this.http.delete(solution._links['self']['href']).subscribe();
  }

  deleteAll(): Subscription {
    return this.http.delete('/solutions').subscribe();
  }
}
