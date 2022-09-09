import { Musician } from './../../interfaces/musician';
import { Router } from '@angular/router';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-musiker',
  templateUrl: './musiker.component.html',
  styleUrls: ['./musiker.component.scss']
})
export class MusikerComponent implements OnInit {
  musicians: Musician[] = [];
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.loadMusicians();
  }

  async loadMusicians() {
    this.musicians = await this.dataService.getMusicians();
  }

  async newMusician() { }

}
