import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../../services/category.service';


@Component({
  selector: 'app-categories',
  standalone: false,

  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _CategoryS : CategoryService) {

    this.dataSource = new MatTableDataSource([] as any);
  }


  ngOnInit(): void {
    this._CategoryS.getCategories().subscribe(data=>{
      console.log(data);
      this.dataSource.data = data;

    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  delete(id:string){
    this._CategoryS.deleteCategoryById(id).subscribe(data=>{
      alert("category deleted successfully");
      })
      this._CategoryS.getCategories().subscribe(data=>{
        console.log(data);
        this.dataSource.data = data;

      })
  }
}

