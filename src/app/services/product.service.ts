import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http:HttpClient) { }
  apiURL ='http://localhost:3000/product';
  uploadURL = 'http://localhost:3000/images/'
  getProducts():Observable<any>{
    return this._http.get<any>(this.apiURL)
  }
  getProductById(id:string):Observable<any>{
    return this._http.get<any>(this.apiURL +'/'+ id);
  }
  addProduct(data:any):Observable<any>{
    return this._http.post<any>(this.apiURL,data);
  }
  updateProductById(id:string,data:any):Observable<any>{
    return this._http.put<any>(this.apiURL + '/'+ id,data)
  }
  deleteProductById(id:string):Observable<any>{
    return this._http.delete<any>(this.apiURL +'/'+ id);
  }

}
