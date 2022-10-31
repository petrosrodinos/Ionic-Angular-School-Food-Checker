import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './ngrx/auth/auth.reducer';
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
import {
  AngularFirePerformanceModule,
  PerformanceMonitoringService,
} from '@angular/fire/compat/performance';
@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot({ auth: authReducer }),
    AngularFireStorageModule,
    IonicStorageModule.forRoot(),
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AuthModule,
    AngularFirePerformanceModule,
    AngularFirestoreModule.enablePersistence(),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PerformanceMonitoringService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
