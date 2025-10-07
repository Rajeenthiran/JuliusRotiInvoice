import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Company'
    },
    children: [
      {
        path: '',
        redirectTo: 'view-company',
        pathMatch: 'full'
      },
      {
        path: 'view-company',
        loadComponent: () => import('./company.component').then(m => m.CompanyComponent),
        data: {
          title: 'View Store'
        }
      },
      {
        path: 'add-company',
        loadComponent: () => import('./add-company/add-company.component').then(m => m.AddCompanyComponent),
        data: {
          title: 'Add Store'
        }
      }
    ]
  }
];

