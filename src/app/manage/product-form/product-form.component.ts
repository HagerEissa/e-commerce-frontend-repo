import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormArray,FormControl,FormGroup, Validators  } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { CategoryService } from '../../services/category.service';
import { BrandService } from '../../services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: false,

  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

  constructor(private _categoryS:CategoryService,private _brandS:BrandService,private _productS:ProductService,private _router:Router,private _route:ActivatedRoute) {}

  brands:any[]=[];
  categories:any[]=[];

  id!:string;
  ngOnInit(): void {
    //get data from service
    this.productForm = new FormGroup({
      name: new FormControl('',[Validators.required,Validators.minLength(3)]),
      desc: new FormControl('',[Validators.required,Validators.minLength(15)]),
      shortDesc: new FormControl('',[Validators.required,Validators.minLength(10)]),
      price: new FormControl('',[Validators.required]),
      discount: new FormControl(''),
      imgURL: new FormArray([
        new FormControl('')
      ]),
      categoryId: new FormControl('',[Validators.required]),
      brandId: new FormControl('',[Validators.required]),
      isTrend: new FormControl(false),
      isnew: new FormControl(false),
    })

    this._categoryS.getCategories().subscribe(data=>{
      this.categories=data;
    })
    this._brandS.getbrands().subscribe(data=>{
      this.brands=data;
    })


    this.id = this._route.snapshot.params['id'];
    console.log(this.id);
    if(this.id){
      this._productS.getProductById(this.id).subscribe(data=>{
        console.log(data);
        this.productForm.patchValue(data as any);
      })
    }

  }
  productForm! : FormGroup

  get images():FormArray{
    return this.productForm.get('imgURL') as FormArray
    }

    addNewImage(){
      let myArray = this.productForm.get('imgURL') as FormArray;
      myArray.push(new FormControl(''));
    }

    removeImage(){
      this.images.removeAt(this.images.controls.length-1)
    }

    // submit(){
    //   console.log(this.productForm.value);
    //   this._productS.addProduct(this.productForm.value).subscribe(data=>{
    //     alert("product added");
    //     this._router.navigateByUrl("/admin/products")
    //   })
    // }

    onImageChange(event: Event, index: number) {
      const input = event.target as HTMLInputElement;
      const file = input?.files?.[0];
      if (file) {
        // Handle the image file if necessary (e.g., preview or validation)
        console.log(`Image at index ${index} selected:`, file);
      }
    }

    addProduct() {
      const formData = new FormData();

      // Append the form fields to FormData
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('desc', this.productForm.get('desc')?.value);
      formData.append('shortDesc', this.productForm.get('shortDesc')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('discount', this.productForm.get('discount')?.value);
      formData.append('categoryId', this.productForm.get('categoryId')?.value);
      formData.append('brandId', this.productForm.get('brandId')?.value);
      formData.append('isTrend', this.productForm.get('isTrend')?.value ? 'true' : 'false');
      formData.append('isnew', this.productForm.get('isnew')?.value ? 'true' : 'false');

      // Handle image file uploads (make sure the images are sent as files, not just URLs)
      const imagesArray = this.productForm.get('imgURL')?.value;
      imagesArray.forEach((image: string, index: number) => {
        const imageInput = <HTMLInputElement>document.getElementById(`image${index + 1}`);
        if (imageInput?.files?.[0]) {
          formData.append('productImage', imageInput.files[0]);
        }
      });

      // Send the FormData to the backend
      this._productS.addProduct(formData).subscribe(data => {
        alert('Product added');
        this._router.navigateByUrl("/admin/products");
      });
    }

    updateProduct(){
      const formData = new FormData();

      // Append the form fields to FormData
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('desc', this.productForm.get('desc')?.value);
      formData.append('shortDesc', this.productForm.get('shortDesc')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('discount', this.productForm.get('discount')?.value);
      formData.append('categoryId', this.productForm.get('categoryId')?.value);
      formData.append('brandId', this.productForm.get('brandId')?.value);
      formData.append('isTrend', this.productForm.get('isTrend')?.value ? 'true' : 'false');
      formData.append('isnew', this.productForm.get('isnew')?.value ? 'true' : 'false');

      // Handle image file uploads (make sure the images are sent as files, not just URLs)
      const imagesArray = this.productForm.get('imgURL')?.value;
      imagesArray.forEach((image: string, index: number) => {
        const imageInput = <HTMLInputElement>document.getElementById(`image${index + 1}`);
        if (imageInput?.files?.[0]) {
          formData.append('productImage', imageInput.files[0]);
        }
      });

      // Send the FormData to the backend
      this._productS.updateProductById(this.id,formData).subscribe(data => {
        alert('Product updated successfully');
        this._router.navigateByUrl("/admin/products");
      });
    }

}
