import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-rules-dialog',
  template: `<ion-header>
      <ion-toolbar translucent color="primary">
        <ion-title>Règles</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div style="margin: 1em;">
        La grille doit être complétée avec des :
        <ul>
          <li>entiers</li>
          <li>distincts</li>
          <li>compris entre 1 et 9</li>
          <li>pour un résultat attendu de 66</li>
        </ul>
      </div>
      <ion-button (click)="ok()" expand="block">Ok</ion-button>
    </ion-content>`,
  styles: [],
})
export class RulesDialogComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  ok() {
    this.modalController.dismiss();
  }
}
