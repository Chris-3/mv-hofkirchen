import { TABLE_MUSICIANS, Musician } from './../../../interfaces/musician';
// import { Observable, zip } from 'rxjs';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-musicians-details',
  templateUrl: './musicians-details.component.html',
  styleUrls: ['./musicians-details.component.scss']
})
export class MusiciansDetailsComponent implements OnInit {
  musician: Musician = null!;
  id: any = null!;
  musicianForm: FormGroup;
  includedFields: any;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private router: Router
  ) {
    this.musicianForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      tel_number: [''],
      street_address: [''],
      city: [''],
      postal_code: ['', Validators.pattern("[0-9]{0,6}")],

    });

    // this.formOptions = this.fb.group({
    //   options: this.fb.array([]),
    // });
  }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    // if (this.id === "new") return;
    if (this.id?.localeCompare("new")) {
      this.musician = await this.dataService.getDataDetails(TABLE_MUSICIANS, +this.id);
      this.musicianForm.patchValue(this.musician);
    }
    this.trackEmptyFields();
  }

  addNewMusican() {
    this.dataService.addNewLineToTable(TABLE_MUSICIANS, this.includedFields);

    this.router.navigateByUrl('/Home/Musiker', { replaceUrl: true })
      .then(() => this.toaster.success('Neuer Musiker angelegt'));
  }

  async updateMusician() {

    if (!this.id?.localeCompare("new")) { this.addNewMusican(); }
    else {
      await this.dataService.updateDataOnTable(TABLE_MUSICIANS, this.musicianForm.value, this.musician.id);
      this.toaster.success('Musiker daten gespeichert!');
    }

  }
  
  async deleteMusician() {
    await this.dataService.deleteDataFromTable(TABLE_MUSICIANS, this.musician.id);
    this.toaster.info('Musiker daten gelöscht!');
    this.router.navigateByUrl('/Home/Musiker');
  }

  get first_name() {
    return this.musicianForm.get('first_name');
  }
  get last_name() {
    return this.musicianForm.get('last_name');
  }
  get tel_number() {
    return this.musicianForm.get('tel_number');
  }
  get postal_code() {
    return this.musicianForm.get('postal_code');
  }

  trackEmptyFields(): void {
    this.musicianForm
      .valueChanges
      .pipe(map(this.filterEmptyFields))
      .subscribe(field => this.includedFields = field);
  }

  filterEmptyFields(data: any): any {    // Filter any fields that aren't empty & store in a new object - To be passed on the Pipe map's caller
    let fields: any = {};
    Object.keys(data).forEach(key => data[key] != '' ? fields[key] = data[key] : key);

    return fields;
  }
}
