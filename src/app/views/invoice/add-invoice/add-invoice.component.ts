import { Component } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent, ColDirective, FormControlDirective,
  FormDirective, FormLabelDirective, GutterDirective,
  FormSelectDirective,
  RowComponent, RowDirective
} from '@coreui/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DecimalPipe, NgStyle} from '@angular/common';
import {CRUDService} from '../../../services/crud.service';

@Component({
  selector: 'app-add-invoice',
  imports: [RowComponent, CardComponent,FormControlDirective, ReactiveFormsModule, FormsModule,FormSelectDirective],
  templateUrl: './add-invoice.component.html',
  styleUrl: './add-invoice.component.scss'
})
export class AddInvoiceComponent {
   userInfo:any;
  selectedDate:string = '';
  dateEntered:string = '';
  storesList:any=[];
  selectStore='';
  deliveryAddress='';

   constructor(private authService:AuthService,private crudServices:CRUDService) {
     this.userInfo=authService.getUser();
     console.log(this.userInfo);
     const today = new Date();
     this.selectedDate = today.toISOString().substring(0, 10);
     this.dateEntered = today.toISOString().substring(0, 10);
     crudServices.getStores().subscribe((res)=>{
       console.log(res);
       if(res){
         this.storesList=res;
       }

     });
   }

  getTotal() {
    return '12.1';
  }

  changeStores(){
    console.log(this.selectStore)
    if(this.storesList.length>0){
        this.storesList.map((store:any)=>{
          console.log(store)
          if(store.id==this.selectStore){
            this.deliveryAddress=store.address.street+','+store.address.city+','+store.address.province+' '+
              store.address.postalCode;
          }
        })
    }
  }
  addItem() {
    console.log(this.selectedDate);
  }
}
