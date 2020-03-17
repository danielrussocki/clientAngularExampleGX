import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserRegister } from '../models/UserRegister';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  API_URI = 'http://localhost:3000/api/auth/register'
  constructor(
    private http: HttpClient
  ) { }

  matchPassword(password: string, repeat_password: string){
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls.password;
      const repeatPasswordControl = formGroup.controls.repeat_password;
      if(!passwordControl || !repeatPasswordControl){
        return null;
      }
      if(repeatPasswordControl.errors && !repeatPasswordControl.errors.passwordMismatch){
        return null;
      }
      if(passwordControl.value !== repeatPasswordControl.value){
        repeatPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        repeatPasswordControl.setErrors(null);
      }
    }
  }

  createUser(newUser: UserRegister){
    return this.http.post(this.API_URI, newUser);
  }

}
