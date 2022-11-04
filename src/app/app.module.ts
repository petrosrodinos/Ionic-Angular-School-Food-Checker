import { FoodEffects } from './ngrx/food/food.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { AuthReducers } from './ngrx/auth/auth.reducer';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { AuthModule } from './pages/auth/auth.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  AngularFirePerformanceModule,
  PerformanceMonitoringService,
} from '@angular/fire/compat/performance';
import { EffectsModule } from '@ngrx/effects';
import { FoodReducers } from './ngrx/food/food.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot({ food: FoodReducers, user: AuthReducers }),
    EffectsModule.forRoot([FoodEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
    AngularFireStorageModule,
    IonicStorageModule.forRoot(),
    AngularFirestoreModule.enablePersistence(),
    IonicModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AuthModule,
    AngularFirePerformanceModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PerformanceMonitoringService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
