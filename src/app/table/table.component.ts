import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { Tableelement, ELEMENT_DATA } from '../../interfaces/tableelement';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { Car } from '../../interfaces/car';
import { CarService } from '../../service/carservice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
interface Column {
  field: string;
  header: string;
}



@Component({
  selector: 'app-table',
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
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {

  // ----------- angular table ------------

  // readonly EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  // displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol', 'prodID'];
  // dataSource = new MatTableDataSource<Tableelement>(ELEMENT_DATA);
  // selection = new SelectionModel<Tableelement>(true, []);

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  // copyToClipboard(value: string): void {
  //   if (navigator && navigator.clipboard) {
  //     navigator.clipboard.writeText(value).then(() => {
  //       console.log('Erfolgreich kopiert:', value);
  //     }).catch(err => {
  //       console.error('Fehler beim Kopieren: ', err);
  //     });
  //   } else {
  //     console.warn('Clipboard API nicht verfügbar.');
  //   }
  // }

  // applyFilter(filterValue: string | undefined): void {
  //   const filter = filterValue ? filterValue.trim().toLowerCase() : '';
  //   this.dataSource.filter = filter;
  // }

  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  // masterToggle() {
  //   this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.dataSource.data.forEach(row => this.selection.select(row));
  // }

  // exportToExcel(): void {
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data); // umwandeln der JSON-Daten in ein arbeitsblatt
  //   const workbook: XLSX.WorkBook = { Sheets: { 'Daten': worksheet }, SheetNames: ['Daten'] }; // erstellen eines arbeitsbuchs (workbook) mit dem arbeitsblatt
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' }); // schreiben des arbeitsbuchs in einen buffer (binary data)
  //   this.saveAsExcelFile(excelBuffer, 'export'); // erzeugen eines blobs und download auslösen
  // }

  // private saveAsExcelFile(buffer: any, fileName: string): void {
  //   const data: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });
  //   saveAs(data, `${fileName}_${new Date().getTime()}.xlsx`);
  // }

  // -------------- primeng table --------------

  cars!: Car[];

  virtualCars!: Car[];

  cols!: Column[];

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
