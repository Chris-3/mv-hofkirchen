import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.scss']
})
export class Login2Component implements OnInit {
  powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

  hero = { email: 'Dr.', alterEgo: 'Dr. What', power: this.powers[0] };
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  heroForm!: FormGroup;

  ngOnInit(): void {
    this.heroForm = new FormGroup(
      {
        email: new FormControl(this.hero.email, [
          Validators.required,
          Validators.pattern(this.emailPattern)
          // forbiddenNameValidator(/bob/i)
        ]),
        // alterEgo: new FormControl(this.hero.alterEgo, {
        //   asyncValidators: [this.alterEgoValidator.validate.bind(this.alterEgoValidator)],
        //   updateOn: 'blur'
        // }),
        // power: new FormControl(this.hero.power, Validators.required)
      }
      // ,  { validators: identityRevealedValidator }
    ); // <-- add custom validator at the FormGroup level
  }

  get email() {
    return this.heroForm.get('email')!;
  }

  // get power() { return this.heroForm.get('power')!; }

  // get alterEgo() { return this.heroForm.get('alterEgo')!; }

  constructor() {}

}
