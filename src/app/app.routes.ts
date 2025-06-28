import { Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { HomeComponentComponent } from './component/home-component/home-component.component';

export const routes: Routes = [
    { path: '', component: HomeComponentComponent },
    { path: 'table', component: TableComponent }
];
