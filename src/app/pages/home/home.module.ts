import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { CardModule } from 'src/app/shared/card/card.module';
import { FeaturesComponent } from './features/features.component';


@NgModule({
  declarations: [
    HomeComponent,
    FeaturesComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    RouterModule.forChild([
      {path: '', component: HomeComponent}
    ])
  ]
})
export class HomeModule { }
