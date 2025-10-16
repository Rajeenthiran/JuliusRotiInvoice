import {Component, inject} from '@angular/core';
import {CRUDService} from '../../services/crud.service';
import {AuthService} from '../../services/auth.service';
import {NavigationExtras, Router} from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-company',
  imports: [],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss'
})
export class CompanyComponent {
  private router = inject(Router);
  storeList: any[] = [];
  adminRole:boolean=false;
  constructor(private crudService:CRUDService,private auth:AuthService) {
    let user:any=auth.getUser();
    if(JSON.parse(user).role=='admin'){
      this.adminRole=true;
    }
    crudService.getStores().subscribe((res)=>{
      if(res){
        this.storeList=res;
      }
    })
  }
  deleteStore(store:any){
  this.crudService.deleteStore(store.id).then(r => {
    Swal.fire({
      title: 'Success!',
      text: 'Store details deleted',
    });
  });
  }
  editStore(store:any){
    const navigationExtras: NavigationExtras = {
      state:{"store":store}
    };
    this.router.navigate(['/company/add-company'],navigationExtras);
  }

}
