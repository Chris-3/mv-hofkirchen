import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toaster: ToastrService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  async login() {
    console.log(this.form.value);
    const { session, error } = await this.auth.login(this.form.value);
    console.log(error);
    if (error) {
      // TODO show error alert
    } else {
      this.router.navigateByUrl('/Home', { replaceUrl: true })
        .then(() => this.toaster.success('You signed in'));
    }
  }

  async register() {
    console.log(this.form.value);
    const { session, error, user } = await this.auth.createAccount(
      this.form.value
    );
    console.log(error);

    if (error) {
      // TODO show error alert
    } else {
      console.log(session);
      console.log(user);

      this.router.navigateByUrl('/Home', { replaceUrl: true });
    }
  }
}
