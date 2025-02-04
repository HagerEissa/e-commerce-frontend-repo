import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient) {
    const token = localStorage.getItem('accessToken');
    const userName = localStorage.getItem('userName');
    const userType = localStorage.getItem('userType');
    const userEmail = localStorage.getItem('userEmail');

    if(token){
      this.tokenSubject.next(token);
    }
    if (userName) {
      this.userNameSubject.next(userName);
    }
    if (userType) {
      this.userTypeSubject.next(userType);
    }
    if (userEmail) {
      this.userEmailSubject.next(userEmail);
    }
   }
  private tokenSubject:BehaviorSubject<string | null> =
  new BehaviorSubject<string | null>(null);
  private userNameSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private userTypeSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private userEmailSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

apiURL = 'http://localhost:3000/user';

 // Register
register(name:string,email:string,password:string): Observable<any> {
  return this._http.post<any>(this.apiURL, {name,email,password}).pipe(
    tap(res => {
      if (res.accessToken) {
        const token = res.accessToken;
        const userName = res.user.name;
        const userType = res.user.userType;
        const userEmail =res.user.email;
        localStorage.setItem('accessToken', token);
        localStorage.setItem('userName', userName);
        localStorage.setItem('userType', userType);
        localStorage.setItem('userEmail', userEmail);
        // Update BehaviorSubjects
        this.tokenSubject.next(token);
        this.userNameSubject.next(userName);
        this.userTypeSubject.next(userType);
        this.userEmailSubject.next(userEmail);

      }
    })
  );
}


//login
  login(loginData:any):Observable<any>{
    return this._http.post<any>(this.apiURL+'/login',loginData).pipe(
      tap(res=>{
        const token = res.accessToken;
        const userName = res.user.name;
        const userType = res.user.userType;
        const userEmail = res.user.email;
        // console.log("rrrrrrrr"+JSON.stringify(res.user) );

        if(token)
        {
        localStorage.setItem('accessToken',token);
        localStorage.setItem('userName',userName);
        localStorage.setItem('userType', userType);
        localStorage.setItem('userEmail', userEmail);
        this.tokenSubject.next(token);
        this.userNameSubject.next(userName);
        this.userTypeSubject.next(userType);
        this.userEmailSubject.next(userEmail);

        console.log(res.accessToken);
        }
      })
    );
  }

  getAccessToken():Observable<string | null>{
      return this.tokenSubject.asObservable();
  }

  getUserName(): Observable<string | null> {
    return this.userNameSubject.asObservable();
  }

  getUserType(): Observable<string | null> {
    return this.userTypeSubject.asObservable();
  }
  getUserEmail(): Observable<string | null> {
    return this.userEmailSubject.asObservable();
  }

  logout(){
this.tokenSubject.next(null);
this.userNameSubject.next(null);
this.userTypeSubject.next(null);
this.userEmailSubject.next(null);

localStorage.removeItem('accessToken');
localStorage.removeItem('userName');
localStorage.removeItem('userType');
localStorage.removeItem('userEmail');


  }

  isAuthanticated():boolean{
   return this.tokenSubject.value !== null;
  }

  isAdmin(): boolean {
    return this.userTypeSubject.value === 'admin';
  }



}
