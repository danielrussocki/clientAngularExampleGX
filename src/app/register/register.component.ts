import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginServiceService } from '../_services/login-service.service';
import { Router } from '@angular/router';
import { RegisterService } from '../_services/register.service';
import { UserRegister } from '../models/UserRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  submitted: boolean = false;
  success: boolean = false;
  messageForm: FormGroup;
  regUser: UserRegister;
  accountExists: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginServiceService,
    private router: Router,
    private registerService: RegisterService
  ) {
    let _token = localStorage.getItem('token');
    if(_token){
      this.loginService.checkIn(_token).subscribe(res => {
        this.router.navigateByUrl('/');
      });
    }
    this.messageForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      usuario: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      repeat_password: ['', Validators.required],
      birthyear: ['', [Validators.required, Validators.min(1900), Validators.max(2013)]]
    },{
      validator: this.registerService.matchPassword('password', 'repeat_password')
    });
  }

  ngOnInit() {
  }

  onRegister(){
    this.submitted = true;
    if(this.messageForm.invalid){
      return;
    }
    this.success = true;
    this.regUser = {
      name: this.messageForm.controls.nombre.value,
      email: this.messageForm.controls.correo.value,
      username: this.messageForm.controls.usuario.value,
      password: this.messageForm.controls.password.value,
      repeat_password: this.messageForm.controls.repeat_password.value,
      birthyear: this.messageForm.controls.birthyear.value
    };
    this.registerService.createUser(this.regUser).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl('/login');
    }, err => {
      console.log(err);
      this.accountExists = true;
    });
  }

}
