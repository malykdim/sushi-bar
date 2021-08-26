import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import { CardModule } from 'src/app/shared/card/card.module';



@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    CardModule,
    RouterModule.forChild([
      {path: '', component: MenuComponent}
    ])
  ]
})
export class MenuModule { }
