import { Component } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-product-list',
  standalone: false,

  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  constructor(private _customer:CustomerService,private _route:ActivatedRoute,private _category:CategoryService){}
  searchTerm:string='' ;
  categoryId:string='';
  sortBy:string='';
  sortOrder:number=-1;
  page:number=1;
  pageSize:number=6 ;
  products:[]=[];
  categories:any=[];
  ngOnInit(){
    this._route.queryParams.subscribe((x:any)=>{
      // console.log(x);
      this.searchTerm=x.search || '';
      this.categoryId=x.categoryId || '';
      this.getProducts();
      this.getCategories();


    })
    // this.id = this._route.snapshot.params['id'];

  }
  getProducts(){
    this._customer.getListProductS(this.searchTerm,this.categoryId,this.sortBy || 'price',this.sortOrder,this.page,this.pageSize).subscribe(data=>{
      this.products=data;
      // Correctly set isNext based on data length
      this.isNext = data.length === this.pageSize;
    })
  }
  getCategories(){
    this._category.getCategories().subscribe(data=>{
      this.categories=data;
    })
  }
  orderChange(event:any){
    console.log(event.target.value);
    this.sortBy='price';
    this.sortOrder = event.target.value; // Use 'asc' or 'desc'
    this.getProducts();

  }
  isNext=true;
  changePage(page: number) {
    if (page < 1) return; // Prevent invalid pages

    this.page = page;
    this.getProducts();
  }
}
////////////////////////
