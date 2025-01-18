import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidor } from '../../../customvalidators/password.validators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,

  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private _auth:AuthService,private _router:Router){}
  registerForm! : FormGroup
  ngOnInit(): void {
    //get data from service
    this.registerForm = new FormGroup({
      username: new FormControl('',[Validators.required,Validators.minLength(3)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,PasswordValidor.passwordStrength()]),

    })

  }


  register(){
    console.log(this.registerForm.value);
    const value = this.registerForm.value;
    this._auth.register(value.username!,value.email!,value.password!).subscribe(data=>{
      alert('registered successfully');
      this._router.navigateByUrl('/login');
    })
  }

  signin(){
    this._router.navigateByUrl('/login');
  }
}
