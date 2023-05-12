import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-rules-dialog',
  template: `<mat-card>
    <mat-card-header>
      <mat-card-title>Rules</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <div style="margin: 1em;">
        The grid should be filled with:
        <ul>
          <li>distincts integers between 1 et 9</li>
          <li>66 as result</li>
        </ul>
      </div>
      <button mat-button (click)="ok()" expand="block">Ok</button>
    </mat-card-content></mat-card
  >`,
  styles: [],
})
export class RulesDialog {
  constructor(private dialogRef: MatDialogRef<RulesDialog>) {}

  ok() {
    this.dialogRef.close()
  }
}
