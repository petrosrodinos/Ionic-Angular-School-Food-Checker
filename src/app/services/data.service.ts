import { Injectable } from '@angular/core';
import { Food } from '../types/food';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  photo =
    'https://img.freepik.com/premium-photo/grilled-beef-steak-potato-vegetables-dark-wooden-table-background-top-view-juicy-meat-dish-with-sauce-potato-peppers-cutlery-disk-restaurant-food_42196-1.jpg?w=2000';
  public foods: Food[] = [
    // {
    //   username: 'Matt Chorsey',
    //   firstplate: 'Pasta',
    //   secondplate: 'Pizza',
    //   description: 'This is a description',
    //   date: '2021-07-01',
    // },
    // {
    //   username: 'Matt Chorsey',
    //   photo: this.photo,
    //   firstplate: 'Pasta',
    //   secondplate: 'Pizza',
    //   description: 'This is a description',
    //   date: '2021-07-01',
    // },
    // {
    //   username: 'Matt Chorsey',
    //   photo: this.photo,
    //   firstplate: 'Pasta',
    //   secondplate: 'Pizza',
    //   description: 'This is a description',
    //   date: '2021-07-01',
    // },
    // {
    //   username: 'Matt Chorsey',
    //   photo: this.photo,
    //   firstplate: 'Pasta',
    //   secondplate: 'Pizza',
    //   description: 'This is a description',
    //   date: '2021-07-01',
    // },
  ];

  constructor() {}

  public getTest(test: any): any[] {
    return test;
  }

  public getMessages(): Food[] {
    return this.foods;
  }

  public getMessageById(id: number): Food {
    return this.foods[id];
  }
}
