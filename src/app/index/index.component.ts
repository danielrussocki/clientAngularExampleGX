import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../_services/login-service.service';
import Micromodal from 'micromodal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Item } from '../models/Item';
import { ItemsService } from '../_services/items.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  isLoadingView: boolean = true;
  loadingGif: string = 'assets/loading.gif';
  dataView: any;
  openMenu: boolean = false;
  submitted: boolean = false;
  success: boolean = false;
  formularioGrupal: FormGroup;
  itemTo: Item;
  errorInsertItem: boolean = false;
  errorDeleteItem: boolean = false;
  isInsertItem: boolean = true;
  loadingForEdit: boolean = false;
  tempId: number = null;
  dataToEdit = {
    id: '',
    title: '',
    description: ''
  };

  constructor(
    private router: Router,
    private loginService: LoginServiceService,
    private constructorForm: FormBuilder,
    private itemService: ItemsService
  ) {
    let _token = localStorage.getItem('token');
    this.loginService.checkIn(_token).subscribe(res => {
      this.isLoadingView = false;
      this.dataView = res;
    }, err => {
        this.router.navigateByUrl('/login');
    });
    this.formularioGrupal = this.constructorForm.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    Micromodal.init({
      onClose: modal => this.makeInsert()
    });
  }

  makeInsert(){
    this.isInsertItem = true;
  }

  showNavMenu(){
    this.openMenu = !this.openMenu;
  }

  killSession(){
    localStorage.removeItem('token');
    window.location.reload();
  }

  beforeEditItem(item: number){
    this.isInsertItem = false;
    this.loadingForEdit = true;
    Micromodal.show('modal-1', {
      onClose: modal => this.makeInsert()
    });
    this.itemService.getItem(item).subscribe((res: any) => {
      this.dataToEdit.id = res.items_id;
      this.dataToEdit.title = res.items_name;
      this.dataToEdit.description = res.items_description;
      this.formularioGrupal.get('title').setValue(this.dataToEdit.title);
      this.formularioGrupal.get('description').setValue(this.dataToEdit.description);
      this.loadingForEdit = false;
    }, err => {
      console.log(err);
    });
  }

  editItem(id: number){
    this.submitted = true;
    if(this.formularioGrupal.invalid){
      return;
    }
    this.success = true;
    this.itemTo = {
      title: this.formularioGrupal.controls.title.value,
      description: this.formularioGrupal.controls.description.value
    }
    this.itemService.editItem(id, this.itemTo).subscribe(res => {
      // console.log(res);
      window.location.reload();
    }, err => {
      // console.log(err);
      this.errorInsertItem = true;
    });
  }

  addItem(){
    this.submitted = true;
    if(this.formularioGrupal.invalid){
      return;
    }
    this.success = true;
    this.itemTo = {
      title: this.formularioGrupal.controls.title.value,
      description: this.formularioGrupal.controls.description.value
    }
    this.itemService.newItem(this.itemTo).subscribe(res => {
      // console.log(res);
      window.location.reload();
    }, err => {
      // console.log(err);
      this.errorInsertItem = true;
    });
  }

  async areYouSure(id: number){
    Micromodal.show('modal-areusure');
    this.tempId = id;
  }

  confirmDelete(){
    this.itemService.deleteItem(this.tempId).subscribe(res => {
      this.tempId = null;
      window.location.reload();
    }, err => {
      this.errorDeleteItem = true;
    });
  }

}
