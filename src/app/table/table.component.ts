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
    MatCheckboxModule
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'prodID'];
  dataSource = new MatTableDataSource<Tableelement>(ELEMENT_DATA);
  selection = new SelectionModel<Tableelement>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  copyToClipboard(value: string): void {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(value).then(() => {
        console.log('Erfolgreich kopiert:', value);
      }).catch(err => {
        console.error('Fehler beim Kopieren: ', err);
      });
    } else {
      console.warn('Clipboard API nicht verfügbar.');
    }
  }

  applyFilter(filterValue: string | undefined): void {
    const filter = filterValue ? filterValue.trim().toLowerCase() : '';
    this.dataSource.filter = filter;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  
}
