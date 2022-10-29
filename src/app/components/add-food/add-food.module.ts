import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddFoodComponent } from './add-food.component';

@NgModule({
  declarations: [AddFoodComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    NgForm,
    ReactiveFormsModule,
    FormGroup,
    FormControl,
    Validators,
  ],
  exports: [AddFoodComponent],
})
export class AddFoodComponentModule {}
