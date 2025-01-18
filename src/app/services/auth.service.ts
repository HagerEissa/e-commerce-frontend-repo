import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient) {
    const token = localStorage.getItem('accessToken');
    if(token){
      this.tokenSubject.next(token);
    }
   }
  private tokenSubject:BehaviorSubject<string | null> =
  new BehaviorSubject<string | null>(null);

apiURL = 'http://localhost:3000/user';

 // Register
register(name:string,email:string,password:string): Observable<any> {
  return this._http.post<any>(this.apiURL, {name,email,password}).pipe(
    tap(res => {
      if (res.accessToken) {
        const token = res.accessToken;
        localStorage.setItem('accessToken', token);
        this.tokenSubject.next(token);
      }
    })
  );
}


//login
  login(loginData:any):Observable<any>{
    return this._http.post<any>(this.apiURL+'/login',loginData).pipe(
      tap(res=>{
        const token = res.accessToken;
        if(token)
        {


        localStorage.setItem('accessToken',token);
        this.tokenSubject.next(token);

        console.log(res.accessToken);
        }
      })
    );
  }

  getAccessToken():Observable<string | null>{
      return this.tokenSubject.asObservable();
  }

  logout(){
this.tokenSubject.next(null);
localStorage.removeItem('accessToken');
localStorage.removeItem('username');
  }

  isAuthanticated():boolean{
   return this.tokenSubject.value !== null;
  }



}
