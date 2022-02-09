import { Component, OnInit } from '@angular/core';
import { SolutionResponse, SolutionsControllerApi } from '@c4-soft/solutions-api';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs/internal/Subscription';
import { BaoLocForm } from './bao-loc-form';

@Component({
  selector: 'app-bao-loc',
  template: `<ion-header>
      <ion-toolbar translucent color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Problème de &laquo; Bao-Loc &raquo;</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-modal trigger="rules-trigger">
        <ng-template>
          <app-rules-dialog></app-rules-dialog>
        </ng-template>
      </ion-modal>
      <ion-modal trigger="cheat-trigger" dismissOnSelect="true">
        <ng-template>
          <app-cheat-dialog
            (onSolutionSelected)="form.updateSolution($event)"
          ></app-cheat-dialog>
        </ng-template>
      </ion-modal>
      <ion-modal trigger="solutions-trigger">
        <ng-template>
          <app-solutions-dialog
            (onSelected)="loadSolution($event)"
          ></app-solutions-dialog>
        </ng-template>
      </ion-modal>
      <div
        style="margin-top: 2em; margin-left: auto; margin-right: auto; width: 21em;"
      >
        <form [formGroup]="form.group">
          <ion-grid>
            <ion-row>
              <ion-col class="bordered">
                <ion-input
                  tabindex="1"
                  type="number"
                  min="1"
                  max="9"
                  [formControl]="form.x1"
                  [color]="form.x1.valid ? '' : 'danger'"
                ></ion-input>
              </ion-col>
              <ion-col></ion-col>
              <ion-col class="bordered">
                <ion-input
                  tabindex="5"
                  type="number"
                  min="1"
                  max="9"
                  [formControl]="form.x5"
                  [color]="form.x5.valid ? '' : 'danger'"
                ></ion-input>
              </ion-col>
              <ion-col class="bordered-no-side">
                <div class="cell-content"><b>-</b></div>
              </ion-col>
              <ion-col class="bordered">
                <ion-input
                  tabindex="6"
                  type="number"
                  min="1"
                  max="9"
                  [formControl]="form.x6"
                  [color]="form.x6.valid ? '' : 'danger'"
                ></ion-input>
              </ion-col>
              <ion-col></ion-col>
              <ion-col class="bordered">
                <div style="height: 100%; padding: .66em 0; text-align: center;">
                  <ion-label [color]="isExpectedResult ? 'success' : 'danger'">
                    <b>{{ result }}</b>
                  </ion-label>
                </div>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col class="bordered-no-top">
                <div class="cell-content"><b>+</b></div>
              </ion-col>
              <ion-col></ion-col>
              <ion-col class="bordered-no-top">
                <div class="cell-content"><b>*</b></div>
              </ion-col>
              <ion-col></ion-col>
              <ion-col class="bordered-no-top">
                <div class="cell-content"><b>-</b></div>
              </ion-col>
              <ion-col></ion-col>
              <ion-col class="bordered-no-top">
                <div class="cell-content"><b>=</b></div>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col class="bordered-no-top">
                <div class="cell-content"><b>13</b></div>
              </ion-col>
              <ion-col></ion-col>
              <ion-col class="bordered-no-top">
                <div class="cell-content"><b>12</b></div>
              </ion-col>
              <ion-col></ion-col>
              <ion-col class="bordered-no-top">
                <div class="cell-content"><b>11</b></div>
              </ion-col>
              <ion-col></ion-col>
              <ion-col class="bordered-no-top">
                <div class="cell-content"><b>10</b></div>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col class="bordered-no-top">
                <div class="cell-content"><b>*</b></div>
              </ion-col>
              <ion-col></ion-col>
              <ion-col class="bordered-no-top">
                <div class="cell-content"><b>+</b></div>
              </ion-col>
              <ion-col></ion-col>
              <ion-col class="bordered-no-top">
                <div class="cell-content"><b>+</b></div>
              </ion-col>
              <ion-col></ion-col>
              <ion-col class="bordered-no-top">
                <div class="cell-content"><b>-</b></div>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col class="bordered-no-top">
                <ion-input
                  tabindex="2"
                  type="number"
                  min="1"
                  max="9"
                  [formControl]="form.x2"
                  [color]="form.x2.valid ? '' : 'danger'"
                ></ion-input>
              </ion-col>
              <ion-col class="bordered-bottom"></ion-col>
              <ion-col class="bordered-no-top">
                <ion-input
                  tabindex="4"
                  type="number"
                  min="1"
                  max="9"
                  [formControl]="form.x4"
                  [color]="form.x4.valid ? '' : 'danger'"
                ></ion-input>
              </ion-col>
              <ion-col></ion-col>
              <ion-col class="bordered-no-top">
                <ion-input
                  tabindex="7"
                  type="number"
                  min="1"
                  max="9"
                  [formControl]="form.x7"
                  [color]="form.x7.valid ? '' : 'danger'"
                ></ion-input>
              </ion-col>
              <ion-col class="bordered-bottom"></ion-col>
              <ion-col class="bordered-no-top">
                <ion-input
                  tabindex="9"
                  type="number"
                  min="1"
                  max="9"
                  [formControl]="form.x9"
                  [color]="form.x9.valid ? '' : 'danger'"
                ></ion-input>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col class="bordered-no-top">
                <div class="cell-content"><b>/</b></div>
              </ion-col>
              <ion-col class="bordered-bottom">
                <ion-input
                  tabindex="3"
                  type="number"
                  min="1"
                  max="9"
                  [formControl]="form.x3"
                  [color]="form.x3.valid ? '' : 'danger'"
                ></ion-input>
              </ion-col>
              <ion-col class="bordered-no-top">
                <div class="cell-content"><b>+</b></div>
              </ion-col>
              <ion-col></ion-col>
              <ion-col class="bordered-no-top">
                <div class="cell-content"><b>*</b></div>
              </ion-col>
              <ion-col class="bordered-bottom">
                <ion-input
                  tabindex="8"
                  type="number"
                  min="1"
                  max="9"
                  [formControl]="form.x8"
                  [color]="form.x8.valid ? '' : 'danger'"
                ></ion-input>
              </ion-col>
              <ion-col class="bordered-no-top">
                <div class="cell-content"><b>/</b></div>
              </ion-col>
            </ion-row>
          </ion-grid>
        </form>
        <div style="margin-top: 1em;">
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button slot="icon-only" color="primary" id="rules-trigger">
                <ion-icon name="help-circle"></ion-icon>
              </ion-button>
              <ion-button slot="icon-only" color="primary" id="cheat-trigger">
                <ion-icon name="hardware-chip"></ion-icon>
              </ion-button>
              <ion-button slot="icon-only" #solutionsTrigger id="solutions-trigger">
                <ion-icon name="server" color="primary"></ion-icon>
              </ion-button>
            </ion-buttons>
            <ion-buttons slot="end">
              <ion-button
                slot="icon-only"
                (click)="create()"
                [disabled]="form.group.invalid"
              >
                <ion-icon name="save" color="primary"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </div>
      </div>
    </ion-content>`,
  styles: [
    'ion-col { width: 3em; height: 3em;}',
    '.bordered { border: 1px solid;}',
    '.bordered-bottom { border-bottom: 1px solid;}',
    '.bordered-no-top { border-left: 1px solid; border-right: 1px solid; border-bottom: 1px solid;}',
    '.bordered-no-side { border-top: 1px solid; border-bottom: 1px solid;}',
    '.cell-content { padding: .66em 0; text-align: center; }',
    'ion-input { text-align: center; margin-top: 0.33em; }',
  ],
})
export class BaoLocPage implements OnInit {
  form = new BaoLocForm();

  formSucbscription?: Subscription;

  private formResult?: number;

  constructor(
    private solutionsApi: SolutionsControllerApi,
    public loadingController: LoadingController,
  ) {}

  ngOnInit() {
    this.formSucbscription = this.form.group.valueChanges.subscribe(() => {
      if (this.form.group.valid) {
        const tmp = this.form.solution?.value;
        this.formResult = Math.round(tmp * 100) / 100;
      } else {
        this.formResult = undefined;
      }
    });
  }

  get result(): number | undefined {
    return this.formResult
      ? Math.round(this.formResult * 10) / 10
      : undefined;
  }

  get isExpectedResult(): boolean {
    return this.formResult === 66;
  }

  async create() {
    const loading = await this.loadingController.create();
    loading.present()
    this.solutionsApi.createSolution(this.form.solution).subscribe(async () => {
      loading.dismiss()
      document.getElementById('solutions-trigger')?.click()
    });
  }

  loadSolution(s: SolutionResponse) {
    this.form.updateSolution(s);
  }
}
