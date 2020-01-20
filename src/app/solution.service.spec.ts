import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SolutionService } from './solution.service';
import { SolutionsFixture } from './test/mocks.module';


describe('SolutionService', () => {
  let httpTestingController: HttpTestingController;
  let service: SolutionService;
  const solutionFixture = new SolutionsFixture();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(SolutionService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should request first page by default', () => {
    const page = solutionFixture.getPage(0, 3);

    service.getPage().subscribe(p => {
      expect(p._embedded.solutionResponseList.length).toBeGreaterThan(0);
    });

    const requests = httpTestingController.match(req =>
      req.url === '/solutions' && req.params.get('page') === '0' && req.params.get('size') === service.pageSize.toString());

    requests[0].flush(page);
  });

  it('should request first specific page when specified', () => {
    const page = solutionFixture.getPage(1, 3);

    service.getPage(1).subscribe(p => {
      expect(p._embedded.solutionResponseList.length).toBeGreaterThan(0);
    });

    const requests = httpTestingController.match(req =>
      req.url === '/solutions' && req.params.get('page') === '1' && req.params.get('size') === service.pageSize.toString());

    requests[0].flush(page);
  });

  it('should PUT solution when update is called', () => {
    service.update(solutionFixture.solutions[0]);
    const requests = httpTestingController.match(req =>
      req.url === solutionFixture.solutions[0]._links.self.href && req.method === 'PUT');
    requests[0].flush({}, { status: 202, statusText: 'ACCEPTED' });
  });

  it('should DELETE solutions when deleteAll is called', () => {
    service.deleteAll();
    const requests = httpTestingController.match(req =>
      req.url === '/solutions' && req.method === 'DELETE');
    requests[0].flush({}, { status: 202, statusText: 'ACCEPTED' });
  });
});
