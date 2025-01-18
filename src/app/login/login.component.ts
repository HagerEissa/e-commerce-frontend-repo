import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidor } from '../../../customvalidators/password.validators';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private _auth:AuthService,private _router:Router){}
    loginForm! : FormGroup
    ngOnInit(): void {
      //get data from service
      this.loginForm = new FormGroup({
        email: new FormControl('',[Validators.required,Validators.email]),
        password: new FormControl('',[Validators.required]),

      })

    }


    login(){
      console.log(this.loginForm.value);
      const value = this.loginForm.value;
      this._auth.login(value).subscribe(data=>{

        alert('login successfully');
        this._router.navigateByUrl('/home');
      })
    }
    signup(){
      this._router.navigateByUrl('/register');
    }
}
