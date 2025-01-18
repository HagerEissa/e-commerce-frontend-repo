import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-brands',
  standalone: false,

  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {
  displayedColumns: string[] = ['id', 'name', 'action'];
    dataSource: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private _brandS : BrandService) {

      this.dataSource = new MatTableDataSource([] as any);
    }


    ngOnInit(): void {
      this._brandS.getbrands().subscribe(data=>{
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
      this._brandS.deleteBrandById(id).subscribe(data=>{
        alert("brand deleted successfully");
        })
        this._brandS.getbrands().subscribe(data=>{
          console.log(data);
          this.dataSource.data = data;

        })
    }
}
