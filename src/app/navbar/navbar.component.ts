import { Component } from '@angular/core';
import { faHeart} from '@fortawesome/free-solid-svg-icons'
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  constructor(private _categoryS:CategoryService,private _router:Router,private _authS:AuthService ){}
  icon = faHeart;
  categoryList:any[]=[];
  ngOnInit(){
    this._categoryS.getCategories().subscribe(data=>{
      this.categoryList=data;
    });

    this._authS.getAccessToken().subscribe(token => {
      this.isLoggedIn = !!token;
    });
  }
  logout() {
    this._authS.logout();
    this._router.navigateByUrl('/home');
  }

  onSearch(event:any){
    console.log(event.target.value);
    if(event.target.value){
      this._router.navigateByUrl("/products?search="+event.target.value);
    }

  }
  searchCategory(id:string){
    this._router.navigateByUrl("/products?categoryId="+id!);
  }
}
