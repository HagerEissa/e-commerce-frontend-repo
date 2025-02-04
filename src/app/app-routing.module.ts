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
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './manage/dashboard/dashboard.component';
import { adminGuard } from './guards/admin.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',  //default
    redirectTo: '/home',
    pathMatch:'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[authGuard]
  },
  {
    path: 'admin/categories',
    component: CategoriesComponent,
    canActivate:[adminGuard]
  },
  {
    path: 'admin/categories/add',
    component: CategoryFormComponent,
    canActivate:[adminGuard]
  },
  {
    path: 'admin/categories/:id', //to update
    component: CategoryFormComponent,
    canActivate:[adminGuard]
  },
  {
    path: 'admin/brands',
    component: BrandsComponent,
    canActivate:[adminGuard]
  },
  {
    path: 'admin/brands/add',
    component: BrandFormComponent,
    canActivate:[adminGuard]
  },
  {
    path: 'admin/brands/:id', //to update,delete
    component: BrandFormComponent,
    canActivate:[adminGuard]
  },
  {
    path: 'admin/products',
    component: ProductsComponent,
    canActivate:[adminGuard]
  },
  {
    path: 'admin/products/add',
    component: ProductFormComponent,
    canActivate:[adminGuard]
  },
  {
    path: 'admin/products/:id', //to update,delete
    component: ProductFormComponent,
    canActivate:[adminGuard]
  },
  {
    path: 'products',
    component: ProductListComponent,
    canActivate:[authGuard]
  },
  {
    path: 'home/product/:id',
    component: ProductDetailsComponent,
    canActivate:[authGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate:[authGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'adminDashboard',
    component: DashboardComponent,
    canActivate:[adminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
