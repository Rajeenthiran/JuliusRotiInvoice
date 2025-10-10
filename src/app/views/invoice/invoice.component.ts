import { Component } from '@angular/core';
import {OrderService} from '../../services/order.service';
import {CurrencyPipe} from '@angular/common';
import {CardBodyComponent, CardComponent, CardHeaderComponent, RowComponent} from '@coreui/angular';
import {AuthService} from '../../services/auth.service';
import {CRUDService} from '../../services/crud.service';

@Component({
  selector: 'app-invoice',
  imports: [CurrencyPipe,CardComponent,CardBodyComponent,CardHeaderComponent,RowComponent],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent {
  userInfo:any;
  adminRole:boolean=false;
  invoiceList:any = [];
  storeList:any=[];
  currentStore:any;
    constructor(private orderService:OrderService,private authService:AuthService,private crudService:CRUDService) {
      this.userInfo=authService.getUser();
      if(JSON.parse(this.userInfo)&&JSON.parse(this.userInfo).role=='admin'){
        this.adminRole=true;
      }
      crudService.getStores().subscribe((res)=>{
        if(res){
          console.log(res);
          this.storeList=res;
        }
      })
      orderService.getInvoiceDetails().subscribe((res)=>{
        if(res){
          this.invoiceList=res;

        }
      });
    }
  toggleExpand(invoice: any) {
    invoice.expanded = !invoice.expanded;
  }
  getStoreName(storeId:any){
      return this.storeList.find((store:any)=>store.id==storeId).storeName;
  }
  refreshInvoices(){
    this.getInvoiceList();
  }
  editInvoice(invoice:any){

  }
  deleteInvoice(invoice:any){

  }
  getInvoiceList(){
    this.orderService.getInvoiceDetails().subscribe((res)=>{
      if(res){
        this.invoiceList=res;

      }
    });
  }
  toggleExpandStore(invoice: any){
    invoice.expandedStore = !invoice.expandedStore;
    this.currentStore=this.storeList.find((store:any)=>store.id==invoice.storeId);
    console.log(this.currentStore)
  }
  getAddress(address:any){
    return `${address.street}, ${address.unit}, ${address.city}, ${address.province}, ${address.postalCode}`;
  }
}
