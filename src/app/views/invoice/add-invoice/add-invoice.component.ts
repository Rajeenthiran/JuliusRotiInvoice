import {Component, inject} from '@angular/core';
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
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-invoice',
  imports: [FormFeedbackComponent,RowComponent,CurrencyPipe, CardComponent,FormControlDirective, ReactiveFormsModule, FormsModule,FormSelectDirective],
  templateUrl: './add-invoice.component.html',
  styleUrl: './add-invoice.component.scss'
})
export class AddInvoiceComponent {
  private router = inject(Router);
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

  invoiceListLen='';
  invoiceDetails:any=[];

  orders:any=[];
  isEdit:boolean=false;
  invoiceId:string='';

   constructor(private authService:AuthService,private crudServices:CRUDService,private orderService:OrderService) {
     this.orders=orderService.getOrders();
     this.userInfo=authService.getUser();
     const today = new Date();

     this.selectedDate = today.toISOString().substring(0, 10);
     this.dateEntered = today.toISOString().substring(0, 10);
     crudServices.getStores().subscribe((res)=>{
       if(res){
         this.storesList=res;
       }

     });
     const navigation = this.router.getCurrentNavigation();
     if (navigation && navigation.extras.state) {
       let sourceData = navigation.extras.state['invoice'];
       if (sourceData) {
         this.invoiceId=sourceData.id;
         this.selectedDate = sourceData.date;
         this.dateEntered = sourceData.dateEntered;
         this.selectStore = sourceData.storeId;
         this.deliveryAddress = sourceData.deliveryAddress;
         this.contactNumber = sourceData.contactNumber;
         this.deliveryType = sourceData.deliveryType;
         this.deliveryDT = sourceData.deliveryDateTime;
         this.paid = sourceData.paid;
         this.comment = sourceData.comment;
         this.totalPrice = sourceData.totalPrice;
         this.valid = sourceData.valid;
         this.invoiceListLen = sourceData.invoiceNo;
         this.invoiceDetails = sourceData.invoiceDetails;
         this.orders = sourceData.orders;
         this.isEdit=true;
       }else{
         this.getInvoiceLen();
       }
     }
   }

  getInvoiceLen(){
     this.orderService.getInvoiceDetails().subscribe((res)=>{
       if(res&&res.length){
         this.invoiceDetails=res;
        this.invoiceListLen='JS0000'+(res.length+1);
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
              let lastInvoice=this.invoiceDetails.find((res:any)=>res.storeId==this.selectStore);
              if(lastInvoice){
                let orderDetails=lastInvoice.orders;
                if(orderDetails){
                  this.orders=orderDetails;
                  this.updateTotal(this.orders);
                }
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
      invoiceNo: this.invoiceListLen,
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
    this.orderService.addInvoices(invoiceData).then((res)=>{
      Swal.fire({
        title: 'Success!',
        text: 'Invoice details added',
        icon: "success"
      });
    });
  }

  }
  editInvoice(){
    if(this.checkValidation()){
      const invoiceData = {
        id:this.invoiceId,
        invoiceNo: this.invoiceListLen,
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
      this.orderService.updateInvoice(invoiceData).then((res)=>{
        Swal.fire({
          title: 'Success!',
          text: 'Invoice details updated',
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
