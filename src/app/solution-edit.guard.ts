import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { SolutionService } from './solution.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SolutionEditGuard implements CanActivate, OnDestroy {

  private isSolutionSelected = false;
  private solutionSelectedSubscription: Subscription;

  constructor(private solutionService: SolutionService, private router: Router) {
    this.solutionSelectedSubscription = this.solutionService.selected.subscribe(s => this.isSolutionSelected = !!s);
  }

  ngOnDestroy() {
    if (this.solutionSelectedSubscription) {
      this.solutionSelectedSubscription.unsubscribe();
    }
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.isSolutionSelected) {
      this.router.navigate(['']);
    }
    return this.isSolutionSelected;
  }

}
