import { Component, OnInit, Input } from '@angular/core';
import { Food } from 'src/app/types/food';
import { DateService } from 'src/app/services/date/date.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
})
export class FoodComponent implements OnInit {
  @Input() food: Food;

  constructor(private dateService: DateService) {}

  ngOnInit() {}

  getTime(date: Date) {
    return this.dateService.formatDate(date);
  }

  isIos() {
    const win = window as any;
    return win && win.Ionic && win.Ionic.mode === 'ios';
  }
}
