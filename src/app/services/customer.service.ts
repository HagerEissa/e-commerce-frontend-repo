import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _http:HttpClient) { }
    apiURL ='http://localhost:3000/customer/';
      uploadURL = 'http://localhost:3000/images/'
    getTrendProducts():Observable<any>{
      return this._http.get<any>(this.apiURL+'/trend-products')
    }
    geNewtProductS():Observable<any>{
      return this._http.get<any>(this.apiURL +'/new-products');
    }


}
