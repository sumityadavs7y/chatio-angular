import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  registerForm = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'name': new FormControl(null, [Validators.required, Validators.minLength(5)]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    'cpassword': new FormControl(null)
  }, { validators: this.cpasswordValidator });

  cpasswordValidator(c: AbstractControl) {
    let password = c.get('password').value;
    let confirmPassword = c.get('cpassword').value;
    if (password != confirmPassword) {
      c.get('cpassword').setErrors({ ConfirmPassword: true });
    }
    return null;
  }

  constructor(private authService: AuthService, private notifierService: NotifierService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      this.notifierService.notify('error', 'Enter valid details');
      return;
    }
    this.isLoading = true;
    this.authService.signup(this.registerForm.value.name, this.registerForm.value.email, this.registerForm.value.password).subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/login'], { queryParams: { 'registered': true } });
        this.notifierService.notify("success", 'Registered');
      },
      errorMessage => {
        this.isLoading = false;
        this.notifierService.notify("error", errorMessage);
      }
    );
  }

}
