import {Component, inject} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {CurrencyPipe} from '@angular/common';
import {CardBodyComponent, CardComponent, CardHeaderComponent, RowComponent} from '@coreui/angular';
import {AuthService} from '../../services/auth.service';
import {CRUDService} from '../../services/crud.service';
import Swal from 'sweetalert2';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-invoice',
  imports: [CurrencyPipe,CardComponent,CardBodyComponent,CardHeaderComponent,RowComponent],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent {
  private router = inject(Router);
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
          this.storeList=res;
        }
      })
      orderService.getInvoiceDetails().subscribe((res)=>{
        // Check if res exists and is an array
        if (res && Array.isArray(res)) {

          // Sort the array in place
          res.sort((a, b) => {
            // ---
            // IMPORTANT: Replace 'invoiceNumber' with the actual property name
            // in your object that holds the "JS0001" value.
            // ---
            const valA = a.invoiceNo;
            const valB = b.invoiceNo;

            // Use localeCompare for smart sorting of alphanumeric strings
            return valA.localeCompare(valB, undefined, { numeric: true });
          });

          // Assign the now-sorted array
          this.invoiceList = res;

        }
      });
    }
  toggleExpand(invoice: any) {
    invoice.expanded = !invoice.expanded;
  }
  getStoreName(storeId:any){
      return this.storeList.find((store:any)=>store.id==storeId)?.storeName;
  }
  refreshInvoices(){
    this.getInvoiceList();
  }
  editInvoice(invoice:any){
    const navigationExtras: NavigationExtras = {
      state:{"invoice":invoice}
    };
    this.router.navigate(['/invoice/add-invoice'],navigationExtras);
  }
  deleteInvoice(invoice:any){
      this.orderService.deleteInvoice(invoice.id).then((res)=>{
        Swal.fire({
          title: 'Success!',
          text: 'Invoice details deleted',
        });
      })
  }
  getInvoiceList(){
    this.orderService.getInvoiceDetails().subscribe((res)=>{
      if(res){
        this.invoiceList=res;

      }
    });
  }
  toggleExpandStore(invoice: any){
      if(invoice.storeId){
        invoice.expandedStore = !invoice.expandedStore;
        this.currentStore=this.storeList.find((store:any)=>store.id==invoice.storeId);
      }

  }
  getAddress(address:any){
    return `${address.street}, ${address.unit}, ${address.city}, ${address.province}, ${address.postalCode}`;
  }
}
