import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { AboutPage } from './about.page';
import { BaoLocProblemComponent } from './bao-loc-problem.component';
import { BaoLocPage } from './bao-loc.page';
import { CheatDialog } from './cheat.dialog';
import { RulesDialog } from './rules.dialog';
import { SolutionsDialog } from './solutions.dialog';
import { ToolbarComponent } from './toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { BaoLocRoutingModule } from './bao-loc-routing.module';

@NgModule({
  declarations: [
    AboutPage,
    BaoLocPage,
    BaoLocProblemComponent,
    CheatDialog,
    RulesDialog,
    SolutionsDialog,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatTooltipModule,
    BaoLocRoutingModule,
  ],
  exports: [AboutPage, BaoLocPage],
})
export class BaoLocCommonsModule {}
