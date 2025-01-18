import { Component } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-brand-form',
  standalone: false,

  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.css'
})
export class BrandFormComponent {
  constructor(private _brandS : BrandService, private router: Router,private route: ActivatedRoute) {}

    name: string='';
    add(){
      console.log(this.name);
      this._brandS.addBrand(this.name).subscribe(data=>{
        alert("brand added successfully");
        this.router.navigateByUrl('/admin/brands');
      })
    }
    isEdit =false;
    id!:string;
    ngOnInit(){
      this.id = this.route.snapshot.params['id']; //to get id from the url
      console.log(this.id);
      if(this.id){
        this.isEdit=true;
        this._brandS.getBrandById(this.id).subscribe(data=>{
          console.log(data);
          this.name= data.name;
        })

      }

    }
    update(){
      console.log(this.name);
      this._brandS.updateBrandById(this.id,this.name).subscribe(data=>{
        alert("brand updated successfully");
        this.router.navigateByUrl('/admin/brands')})
    }


}
