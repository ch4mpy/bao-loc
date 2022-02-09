import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SolutionsControllerApi } from '@c4-soft/solutions-api';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-settings',
  template: `<ion-header>
      <ion-toolbar translucent color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Configuration</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div style="margin-top: 2em;">
        <ion-title>Serveurs</ion-title>
        <ion-item >
          <ion-label position="floating">API Bao-Loc</ion-label>
          <ion-input [formControl]="solutionsPathCtrl"></ion-input>
        </ion-item>
      </div>
    </ion-content>`,
  styles: [],
})
export class SettingsScreen implements OnInit {
  solutionsPathCtrl = new FormControl('', [Validators.required]);

  constructor(
    private solutionsApi: SolutionsControllerApi,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.storage.create().then(() => {
      this.storage.get('solutionsPath').then(
        (p) => {
          this.solutionsPathCtrl.patchValue(
            p || this.solutionsApi.configuration.basePath
          )
          if (p) {
            this.solutionsApi.configuration.basePath = p;
          }
        },
        (error) => {
          console.error(error);
          this.solutionsPathCtrl.patchValue(
            this.solutionsApi.configuration.basePath
          );
        }
      );
    });
    this.solutionsPathCtrl.valueChanges.subscribe((newPath) => {
      if (this.solutionsPathCtrl.valid) {
        this.storage.set('solutionsPath', newPath);
        this.solutionsApi.configuration.basePath = newPath;
      }
    });
  }
}
