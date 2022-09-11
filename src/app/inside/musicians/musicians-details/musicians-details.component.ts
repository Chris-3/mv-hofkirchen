import { TABLE_MUSICIANS } from './../../../interfaces/musician';
// import { Observable, zip } from 'rxjs';

import { FormBuilder, FormGroup, Validators, FormArray, } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Musician } from './../../../interfaces/musician';

@Component({
  selector: 'app-musicians-details',
  templateUrl: './musicians-details.component.html',
  styleUrls: ['./musicians-details.component.scss']
})
export class MusiciansDetailsComponent implements OnInit {
  musician: Musician = null!;
  id: any=null!;
  musicianForm: FormGroup;

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
      tel_number: ['', Validators.pattern("[0-9]{0,15}")],
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
    if (!this.id) return;
    if (this.id) {

      this.musician = await (await this.dataService.getDataDetails(TABLE_MUSICIANS, +this.id)).data;
      // const options = await (await this.dataService.getVotingOptions(+id)).data;
      // options?.map((item) => {
      //   const option = this.fb.group({
      //     title: [item.title, Validators.required],
      //     id: item.id,
      //   });
      //   this.options.push(option);
      // });

      this.musicianForm.patchValue(this.musician);
    }
  }
  addNewMusican() {
    const data = this.dataService.addNewLineToTable(TABLE_MUSICIANS, this.musicianForm.value);
    console.log(data);
    this.router.navigateByUrl('/Home/Musiker', { replaceUrl: true })
      .then(() => this.toaster.success('Neuer Musiker angelegt'));
  }

  async updateMusician() {
    if(!this.id)this.addNewMusican;
    await this.dataService.updateDataOnTable(TABLE_MUSICIANS, this.musicianForm.value, this.musician.id);
    this.toaster.success('Musiker daten gespeichert!');

  }

  async deleteMusician() {
    await this.dataService.deleteDataFromTable(TABLE_MUSICIANS, this.musician.id);
    this.toaster.info('Musiker daten gelöscht!');
    this.router.navigateByUrl('/Home');
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
}
