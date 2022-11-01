import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-content',
  templateUrl: './loading-content.component.html',
  styleUrls: ['./loading-content.component.scss'],
})
export class LoadingContentComponent implements OnInit {
  @Input() loading: boolean;

  constructor() {}

  ngOnInit() {}
}
