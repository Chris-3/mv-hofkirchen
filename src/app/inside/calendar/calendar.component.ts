import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  url :string ='https://calendar.google.com/calendar/embed?src=musikvereinhofkirchen%40gmail.com&ctz=Europe%2FVienna';
  constructor() { }

  ngOnInit(): void {
  }

}
