import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { SolutionsApi } from '@c4-soft/solutions-api';
import { LoadingController, ModalController } from '@ionic/angular';
import { SolutionResponse } from 'projects/c4-soft/solutions-api';
import { lastValueFrom } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-solutions-dialog',
  template: `<ion-header>
      <ion-toolbar translucent color="primary">
        <ion-title>Solutions sauvegardées</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item *ngFor="let s of solutions">
        <app-solution-edit
          [solution]="s"
          (onSolutionTrashed)="trash($event)"
          (onSolutionSelected)="select($event)"
        ></app-solution-edit>
      </ion-item>
    </ion-content>`,
  styles: [],
})
export class SolutionsDialogComponent implements OnInit {
  solutions: SolutionResponse[] = [];

  @Output()
  onSelected = new EventEmitter<SolutionResponse>();

  constructor(
    private solutionsApi: SolutionsApi,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    const loading = await this.loadingController.create();
    await loading.present();
    const solutions = await lastValueFrom(
      this.solutionsApi.retrievePlayerSolutions()
    ).finally(() => loading.dismiss());
    this.solutions = solutions.sort((a, b) => b.id - a.id) || [];
    this.cdr.detectChanges();
  }

  select(s: SolutionResponse) {
    this.onSelected.emit(s);
    this.modalController.dismiss({ selectedSolution: s });
  }

  trash(trashed: SolutionResponse) {
    this.solutions.splice(
      this.solutions.findIndex((sol) => sol.id === trashed.id),
      1
    );
  }
}
