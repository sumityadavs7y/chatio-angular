import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthService } from '../auth.service';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent implements OnInit {

  isLoading = false;
  loginForm = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'password': new FormControl(null, [Validators.required])
  });
  private readonly notifier: NotifierService;

  constructor(private authService: AuthService, private router: Router, notifierService: NotifierService, private route: ActivatedRoute) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered'] === 'true') {
        this.notifier.notify('success', 'Registered Successful');
      }
    })
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.notifier.notify("error", "Enter valid details");
      return;
    }
    this.isLoading = true;

    let authObs: Observable<{ message: string }>;

    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      resData => {
        this.isLoading = false;
        console.log('navigating');
        this.router.navigate(['/chat']);
      },
      errorMessage => {
        this.isLoading = false;
        this.notifier.notify("error", errorMessage);
      }
    );
  }
}
