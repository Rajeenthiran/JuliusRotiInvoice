import { Component } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent, ColDirective, FormControlDirective,
  FormDirective, FormLabelDirective, GutterDirective,
  RowComponent, RowDirective
} from '@coreui/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DecimalPipe, NgStyle} from '@angular/common';

@Component({
  selector: 'app-add-invoice',
  imports: [RowComponent, CardComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './add-invoice.component.html',
  styleUrl: './add-invoice.component.scss'
})
export class AddInvoiceComponent {
   userInfo:any;
  selectedDate:string = '';

   constructor(private authService:AuthService) {
     this.userInfo=authService.getUser();
     console.log(this.userInfo);
     const today = new Date();
     this.selectedDate = today.toISOString().substring(0, 10);
   }

  getTotal() {
    return '12.1';
  }


  addItem() {

  }
}
