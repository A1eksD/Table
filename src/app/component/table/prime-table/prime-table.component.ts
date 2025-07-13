import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { CarService } from '../../../../service/carservice';
import { Car } from '../../../../interfaces/car';
import { Column } from '../../../../interfaces/column';


@Component({
  selector: 'app-prime-table',
  imports: [
    MatTableModule, 
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule, 
    MatCheckboxModule,
    MatSortModule,
    TableModule,
    SkeletonModule,
    ButtonModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './prime-table.component.html',
  styleUrl: './prime-table.component.scss'
})
export class PrimeTableComponent {
[x: string]: any;

  cars!: Car[];
  virtualCars!: Car[];
  cols!: Column[];
  heroes: any; // TODO: fill with value
  items: any; // TODO: fill with value

  constructor(private carService: CarService) {}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.cols = [
        { field: 'id', header: 'Id' },
        { field: 'vin', header: 'Vin' },
        { field: 'year', header: 'Year' },
        { field: 'brand', header: 'Brand' },
        { field: 'color', header: 'Color' }
      ];

      this.cars = Array.from({ length: 10000 }).map((_, i) => this.carService.generateCar(i + 1));
      this.virtualCars = Array.from({ length: 10000 });
  }

  loadCarsLazy(event: TableLazyLoadEvent) {
      //simulate remote connection with a timeout
    setTimeout(() => {
      //load data of required page
      const first = event.first ?? 0;
      const rows  = event.rows  ?? 0;
      const loadedCars = this.cars.slice(first, first + rows);

      //populate page of virtual cars
      Array.prototype.splice.apply(
              this.virtualCars,
              [first, rows, ...loadedCars]
            );

            //trigger change detection
      this.virtualCars = [...this.virtualCars];
    }, Math.random() * 1000 + 250);
  }
  
}
