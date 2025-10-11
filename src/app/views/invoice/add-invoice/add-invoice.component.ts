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
  RowComponent, RowDirective, FormFeedbackComponent
} from '@coreui/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CurrencyPipe, DecimalPipe, NgStyle} from '@angular/common';
import {CRUDService} from '../../../services/crud.service';
import {OrderService} from '../../../services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-invoice',
  imports: [FormFeedbackComponent,RowComponent,CurrencyPipe, CardComponent,FormControlDirective, ReactiveFormsModule, FormsModule,FormSelectDirective],
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
  contactNumber='';
  deliveryType='Delivery';
  deliveryDT='';
  paid='Yes';
  comment='';
  totalPrice=0;
  valid=true;

  invoiceListLen=0;
  invoiceDetails:any=[];

  orders:any=[];

   constructor(private authService:AuthService,private crudServices:CRUDService,private orderService:OrderService) {
     this.getInvoiceLen();
     this.orders=orderService.getOrders();
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

  getInvoiceLen(){
     this.orderService.getInvoiceDetails().subscribe((res)=>{
       if(res&&res.length){
         this.invoiceDetails=res;
         console.log(res);
        this.invoiceListLen=res.length;
       }
     })
  }
  changeStores(){
    if(this.storesList.length>0){
        this.storesList.map((store:any)=>{
          if(store.id==this.selectStore){
            this.deliveryAddress=store.address.street+','+store.address.city+','+store.address.province+' '+
              store.address.postalCode;
            this.contactNumber=store.storePhone;
            if(this.invoiceDetails){
              let lastInvoice=this.invoiceDetails.find((res:any)=>res.storeId=this.selectStore);
              console.log(lastInvoice)
              let orderDetails=lastInvoice.orders;
              console.log(orderDetails)
              if(orderDetails){
                this.orders=orderDetails;
                this.updateTotal(this.orders);
              }
            }

          }
        })
    }
  }

  updateTotal(order: any) {
    order.total = (order.qty || 0) * order.price;
    this.calculateTotal();

  }
  calculateTotal() {
     let total=0;
     if(this.orders&&this.orders.length>0){
       this.orders.map((order:any)=>{
         total+=order.total;
       });
       this.totalPrice=total;
     }

  }

  submitInvoice(){
  if(this.checkValidation()){
    const invoiceData = {
      invoiceNo: 'JS000'+(this.invoiceListLen+1),
      date: this.selectedDate,
      storeId: this.selectStore,
      contactNumber: this.contactNumber,
      orders:this.orders,
      deliveryDateTime: this.deliveryDT,
      deliveryAddress: this.deliveryAddress,
      deliveryType: this.deliveryType,
      paid: this.paid,
      comment: this.comment,
      totalAmount: this.totalPrice,
      createdAt: new Date(),
      createdBy:JSON.parse(this.userInfo).username
    };
    console.log(invoiceData)
    this.orderService.addInvoices(invoiceData).then((res)=>{
      Swal.fire({
        title: 'Success!',
        text: 'Invoice details added',
        icon: "success"
      });
    });
  }

  }
  checkValidation(){
     let validation=false;
     if(this.selectStore!=null&&this.selectStore!=''){
        validation=true;
     }else{
       this.valid=false;
       Swal.fire({
         title: 'Warning!',
         text: 'Please enter required fields',
         icon: "warning"
       });
     }
     return validation;
  }
}
