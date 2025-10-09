import { Component } from '@angular/core';
import {OrderService} from '../../services/order.service';
import {CurrencyPipe} from '@angular/common';
import {CardBodyComponent, CardComponent, CardHeaderComponent, RowComponent} from '@coreui/angular';
import {AuthService} from '../../services/auth.service';

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
    constructor(private orderService:OrderService,private authService:AuthService) {
      this.userInfo=authService.getUser();
      console.log(JSON.parse(this.userInfo))
      if(JSON.parse(this.userInfo)&&JSON.parse(this.userInfo).role=='admin'){
        this.adminRole=true;
      }
      console.log(this.adminRole)

      orderService.getInvoiceDetails().subscribe((res)=>{
        console.log(res);
        if(res){
          this.invoiceList=res;

        }
      });
    }
  toggleExpand(invoice: any) {
    invoice.expanded = !invoice.expanded;
  }
  refreshInvoices(){

  }
}
