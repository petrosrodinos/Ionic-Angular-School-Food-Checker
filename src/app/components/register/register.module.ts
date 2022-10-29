import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RegisterComponent } from './register.component';
@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, IonicModule, RouterModule],
  exports: [RegisterComponent],
})
export class RegisterComponentModule {}
