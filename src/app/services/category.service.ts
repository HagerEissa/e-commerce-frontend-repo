import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http:HttpClient) { }

   //Observable (this is the box) : use case real time application
  apiURL ='http://localhost:3000/category';
  getCategories():Observable<any>{
    return this._http.get<any>(this.apiURL)
  }
  getCategoryById(id:string):Observable<any>{
    return this._http.get<any>(this.apiURL +'/'+ id);
  }
  addCategories(name:string):Observable<any>{
    return this._http.post<any>(this.apiURL,{name : name})
  }

  updateCategoryById(id:string,name:string):Observable<any>{
    return this._http.put<any>(this.apiURL +'/'+ id,{name : name})
  }

  deleteCategoryById(id:string):Observable<any>{
    return this._http.delete<any>(this.apiURL +'/'+ id);
  }
}
