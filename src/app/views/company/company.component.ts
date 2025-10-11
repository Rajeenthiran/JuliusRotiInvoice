import { Component } from '@angular/core';
import {CRUDService} from '../../services/crud.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-company',
  imports: [],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss'
})
export class CompanyComponent {
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

  }
  editStore(store:any){

  }
}
