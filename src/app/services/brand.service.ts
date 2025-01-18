import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private _http:HttpClient) { }

  apiURL ='http://localhost:3000/brand';
  getbrands():Observable<any>{
    return this._http.get<any>(this.apiURL)
  }
  getBrandById(id:string):Observable<any>{
    return this._http.get<any>(this.apiURL +'/'+ id);
  }
  addBrand(name:string):Observable<any>{
    return this._http.post<any>(this.apiURL,{name : name})
  }
  updateBrandById(id:string,name:string):Observable<any>{
    return this._http.put<any>(this.apiURL + '/'+ id,{name : name})
  }
  deleteBrandById(id:string):Observable<any>{
    return this._http.delete<any>(this.apiURL +'/'+ id);
  }

}
