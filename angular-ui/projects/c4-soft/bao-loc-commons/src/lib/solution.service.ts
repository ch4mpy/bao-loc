import { Injectable } from '@angular/core';
import { Solution } from '@c4-soft/bao-loc-domain';

@Injectable()
export abstract class SolutionService {
  abstract getAllSolutions(): Promise<Solution[]>;
}
