import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './manage/categories/categories.component';
import { CategoryFormComponent } from './manage/category-form/category-form.component';
import { BrandsComponent } from './manage/brands/brands.component';
import { BrandFormComponent } from './manage/brand-form/brand-form.component';
import { ProductsComponent } from './manage/products/products.component';
import { ProductFormComponent } from './manage/product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',  //default
    redirectTo: '/home',
    pathMatch:'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'admin/categories',
    component: CategoriesComponent
  },
  {
    path: 'admin/categories/add',
    component: CategoryFormComponent
  },
  {
    path: 'admin/categories/:id', //to update
    component: CategoryFormComponent
  },
  {
    path: 'admin/brands',
    component: BrandsComponent
  },
  {
    path: 'admin/brands/add',
    component: BrandFormComponent
  },
  {
    path: 'admin/brands/:id', //to update,delete
    component: BrandFormComponent
  },
  {
    path: 'admin/products',
    component: ProductsComponent
  },
  {
    path: 'admin/products/add',
    component: ProductFormComponent
  },
  {
    path: 'admin/products/:id', //to update,delete
    component: ProductFormComponent
  },
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'home/product/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
