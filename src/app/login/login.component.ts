import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserLogin } from '../models/UserLogin';
import { LoginServiceService } from '../_services/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted: boolean = false;
  success: boolean = false;
  messageForm: FormGroup;
  logUser: UserLogin;
  validUser: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginServiceService,
    private router: Router
  ) {
    let _token = localStorage.getItem('token');
    if(_token){
      this.loginService.checkIn(_token).subscribe(res => {
        this.router.navigateByUrl('/');
      });
    }
    this.messageForm =  this.formBuilder.group({
      entry: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    });
  }

  onSignIn() {
    this.submitted = true;
    if(this.messageForm.invalid){
      return;
    }
    this.success = true;
    this.logUser = {
      entry: this.messageForm.controls.entry.value,
      password: this.messageForm.controls.password.value
    };
    this.loginService.logIn(this.logUser).subscribe(
      (res: any) => {
      console.log(res);
      this.validUser = true;
      localStorage.setItem('token', res.token);
    },
    err => {
      console.log(err);
      this.validUser = false;
    }, () => this.navIndex());
  }

  navIndex() {
    this.router.navigateByUrl('/');
  }

  ngOnInit() {
  }

}
