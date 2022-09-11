import { Router } from '@angular/router';
import { DataService } from './../../../services/data.service';
import { Musician, TABLE_MUSICIANS } from './../../../interfaces/musician';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-musicians-list',
  templateUrl: './musicians-list.component.html',
  styleUrls: ['./musicians-list.component.scss']
})
export class MusiciansListComponent implements OnInit {
  musicians: Musician[] = [];
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.loadMusicians();
  }

  async loadMusicians() {
    this.musicians = await this.dataService.getDataFromTable(TABLE_MUSICIANS);
  }

  async newMusician() {
    this.router.navigateByUrl(`/Home/Musiker/`);
   }

}
