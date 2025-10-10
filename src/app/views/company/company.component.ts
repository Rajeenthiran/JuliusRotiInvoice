import { Component } from '@angular/core';
import {CRUDService} from '../../services/crud.service';

@Component({
  selector: 'app-company',
  imports: [],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss'
})
export class CompanyComponent {
  storeList: any[] = [];
  constructor(private crudService:CRUDService) {
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
