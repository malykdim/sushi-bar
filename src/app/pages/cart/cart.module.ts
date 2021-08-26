import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { RouterModule } from '@angular/router';
import { CardModule } from 'src/app/shared/card/card.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    RouterModule.forChild([
      {path: '', component: CartComponent}
    ])
  ]
})
export class CartModule { }
