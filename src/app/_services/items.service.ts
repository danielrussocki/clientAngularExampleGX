import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../models/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  API_URI: string = 'http://localhost:3000/api/items'

  constructor(private http: HttpClient) { }

  newItem(_itemObject: Item){
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem('token'))
    };
    return this.http.post(this.API_URI, _itemObject, header);
  }

  deleteItem(id: number){
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem('token'))
    };
    return this.http.delete(`${this.API_URI}/${id}`, header);
  }

  editItem(id: number, item: Item){
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem('token'))
    };
    return this.http.put(`${this.API_URI}/${id}`, item, header);
  }

  getItem(id: number){
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem('token'))
    };
    return this.http.get(`${this.API_URI}/${id}`, header);
  }

}
