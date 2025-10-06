import { Routes } from '@angular/router';

export const routes: Routes = [

   {
    path: '',
    data: {
      title: 'Invoice'
    },
    children: [
      {
        path: '',
        redirectTo: 'view-invoice',
        pathMatch: 'full'
      },
      {
       path: 'view-invoice',
      loadComponent: () => import('./invoice.component').then(m => m.InvoiceComponent),
       data: {
          title: 'View Invoice'
        }
      },
      {
        path: 'add-invoice',
        loadComponent: () => import('./add-invoice/add-invoice.component').then(m => m.AddInvoiceComponent),
        data: {
          title: 'Add Invoice'
        }
      }
    ]
  }
];

