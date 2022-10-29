import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login.component';
@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, IonicModule, RouterModule],
  exports: [LoginComponent],
})
export class LoginComponentModule {}
