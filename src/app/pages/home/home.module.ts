import { Storage } from '@ionic/storage';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddFoodComponent } from '../../components/add-food/add-food.component';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { FoodComponentModule } from '../../components/food/food.module';
import { FoodService } from 'src/app/services/food/food.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodComponentModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [HomePage, AddFoodComponent],
})
export class HomePageModule {}
