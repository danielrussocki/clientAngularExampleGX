import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginServiceService } from './_services/login-service.service';
import { IndexComponent } from './index/index.component';
import { ItemsService } from './_services/items.service';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './_services/register.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    LoginServiceService,
    ItemsService,
    RegisterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
