import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-category-form',
  standalone: false,

  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {
    constructor(private _CategoryS : CategoryService, private router: Router,private route: ActivatedRoute) {}

  name: string='';
  add(){
    console.log(this.name);
    this._CategoryS.addCategories(this.name).subscribe(data=>{
      alert("category added successfully");
      this.router.navigateByUrl('/admin/categories');
    })
  }
  isEdit =false;
  id!:string;
  ngOnInit(){
    this.id = this.route.snapshot.params['id']; //to get id from the url
    console.log(this.id);
    if(this.id){
      this.isEdit=true;
      this._CategoryS.getCategoryById(this.id).subscribe(data=>{
        console.log(data);
        this.name= data.name;
      })

    }

  }
  update(){
    console.log(this.name);
    this._CategoryS.updateCategoryById(this.id,this.name).subscribe(data=>{
      alert("category updated successfully");
      this.router.navigateByUrl('/admin/categories')})
  }


}
