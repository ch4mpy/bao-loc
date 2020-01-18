import { Injectable } from '@angular/core';
import { CanActivate , ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SolutionService } from './solution.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SolutionEditGuard implements CanActivate  {
  constructor(private solutionService: SolutionService, private router: Router) {}

  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  	const isSolutionSelected = !!this.solutionService.selected$.value;
  	if(!isSolutionSelected) {
  		this.router.navigate(['']);
  	}
  	return isSolutionSelected;
  }
  
}
