import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Solution } from './solution';

@Component({
  selector: 'app-cheat-dialog',
  template: `<ion-header>
      <ion-toolbar translucent color="primary">
        <ion-title> Triche: les {{ solutions.length }} solutions </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item *ngFor="let s of solutions" (click)="selectSolution(s)">
        <ion-grid>
          <ion-row>
            <ion-col>{{ s.x1 }}</ion-col>
            <ion-col>{{ s.x2 }}</ion-col>
            <ion-col>{{ s.x3 }}</ion-col>
            <ion-col>{{ s.x4 }}</ion-col>
            <ion-col>{{ s.x5 }}</ion-col>
            <ion-col>{{ s.x6 }}</ion-col>
            <ion-col>{{ s.x7 }}</ion-col>
            <ion-col>{{ s.x8 }}</ion-col>
            <ion-col>{{ s.x9 }}</ion-col>
          </ion-row>
        </ion-grid>
      </ion-item>
    </ion-content>`,
  styles: [],
})
export class CheatDialogComponent implements OnInit {
  solutions: Solution[] = [];

  @Output()
  onSolutionSelected = new EventEmitter<Solution>();

  constructor(
    private modalController: ModalController,
    public loadingController: LoadingController,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    const loading = await this.loadingController.create();
    await loading.present();
    CheatDialogComponent.explore(
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [],
      this.solutions
    );
    loading.dismiss();
    this.cdr.detectChanges();
  }

  selectSolution(s: Solution) {
    this.onSolutionSelected.emit(s);
    this.modalController.dismiss({ selectedSolution: s });
  }

  private static explore(
    possibilities: number[],
    elements: number[],
    validSolutions: Solution[]
  ) {
    if (possibilities.length > 1) {
      possibilities.forEach((picked) => {
        const el = Object.assign([], elements);
        el.push(picked);
        const remaining = possibilities.filter((x) => x != picked);
        CheatDialogComponent.explore(remaining, el, validSolutions);
      });
    } else {
      const solution = new Solution(
        elements[0],
        elements[1],
        elements[2],
        elements[3],
        elements[4],
        elements[5],
        elements[6],
        elements[7],
        possibilities[0]
      );
      if (solution.isValid) {
        validSolutions.push(solution);
      }
    }
  }
}
