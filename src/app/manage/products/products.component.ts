import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: false,

  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  displayedColumns: string[] = ['id', 'name', 'desc','price','discount','action'];
      dataSource: MatTableDataSource<any>;

      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;

      constructor(private _productS : ProductService) {

        this.dataSource = new MatTableDataSource([] as any);
      }


      ngOnInit(): void {
        this._productS.getProducts().subscribe(data=>{
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
        this._productS.deleteProductById(id).subscribe(data=>{
          alert("product deleted successfully");
          this._productS.getProducts().subscribe(data=>{
            console.log(data);
            this.dataSource.data = data;

          })
          })

      }
}
