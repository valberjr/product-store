import { Routes } from '@angular/router';
import { CreateComponent } from './features/create/create.component';
import { ListComponent } from './features/list/list.component';

export const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'create-product',
    component: CreateComponent,
  },
];
