import { DateService } from './../date/date.service';
import { FireserviceService } from '../auth/fireservice.service';
import { Injectable } from '@angular/core';
import { Food } from 'src/app/types/food';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  imagePath: string;
  constructor(
    private firestore: AngularFirestore,
    private fireservice: FireserviceService,
    private dateService: DateService,
    private fireStorage: AngularFireStorage
  ) {}

  public async addFood(food: Food): Promise<any> {
    const user = this.fireservice.getUser();
    if (user) {
      return this.uploadPhoto(food).then((res) => {
        const foodWithUser = {
          ...food,
          photo: res,
          userId: user.uid,
          date: this.dateService.formatDate(new Date()),
          time: this.dateService.formatTime(new Date()),
        };
        return this.firestore.collection('food').add(foodWithUser);
      });
    }
  }

  public getFoods(): any {
    return this.firestore
      .collection('food', (ref) =>
        ref
          .where('date', '==', this.dateService.formatDate(new Date()))
          .orderBy('time', 'desc')
      )
      .valueChanges();
  }

  public async uploadPhoto(food: Food): Promise<string> {
    return this.fireStorage
      .upload(
        `meals/${new Date().toDateString().split(' ').concat('-')}_${
          food.firstplate
        }-${food.secondplate}`,
        food.photo.blob
      )
      .snapshotChanges()
      .toPromise()
      .then((res) => {
        return res.ref.getDownloadURL() as Promise<string>;
      });
  }
}
