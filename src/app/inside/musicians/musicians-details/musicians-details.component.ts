import { TABLE_MUSICIANS } from './../../../interfaces/musician';
// import { Observable, zip } from 'rxjs';

import { FormBuilder, FormGroup, Validators, FormArray,} from '@angular/forms';
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
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private router: Router
  ) {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      tel_number: ['',Validators.pattern("[0-9]{0,13}")],
      street_address: [''],
      city: [''],
      postal_code: [''],
      
    });

    // this.formOptions = this.fb.group({
    //   options: this.fb.array([]),
    // });
  }

 async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      
      this.musician = await(await this.dataService.getDataDetails(TABLE_MUSICIANS, +id)).data;
      // const options = await (await this.dataService.getVotingOptions(+id)).data;
      // options?.map((item) => {
      //   const option = this.fb.group({
      //     title: [item.title, Validators.required],
      //     id: item.id,
      //   });
      //   this.options.push(option);
      // });

      this.form.patchValue(this.musician);
    }
  }

  
  async updateMusician() {
    await this.dataService.updateDataOnTable(TABLE_MUSICIANS, this.form.value, this.musician.id);
    this.toaster.success('Musiker daten gespeichert!');
  }

  async deleteMusician() {
    await this.dataService.deleteDataFromTable(TABLE_MUSICIANS, this.musician.id);
    this.toaster.info('Musiker daten gelöscht!');
    this.router.navigateByUrl('/Home');
  }
}
