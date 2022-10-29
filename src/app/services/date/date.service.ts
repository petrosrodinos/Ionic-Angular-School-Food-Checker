import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  formatTime(date: Date | string) {
    var formatted = new Date(date);
    let hours = ('0' + (formatted.getHours() + 1)).slice(-2);
    let minutes = ('0' + formatted.getMinutes()).slice(-2);

    return [hours, minutes].join(':');
  }

  formatDate = (date: Date | string) => {
    var formatted = new Date(date);
    let month = ('0' + (formatted.getMonth() + 1)).slice(-2);
    let day = ('0' + formatted.getDate()).slice(-2);

    return [day, month, formatted.getFullYear()].join('-');
  };

  canAddFood = () => {
    const now = new Date();
    let time = now.getHours();
    console.log(time);
    if ((time >= 12 && time <= 16) || (time >= 19 && time <= 22)) {
      return true;
    } else {
      return false;
    }
  };
}
