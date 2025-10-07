import { Component } from '@angular/core';
import {CardComponent, RowComponent} from '@coreui/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CRUDService} from '../../../services/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-company',
  imports: [RowComponent, CardComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './add-company.component.html',
  styleUrl: './add-company.component.scss'
})
export class AddCompanyComponent {
  constructor(private crudServices:CRUDService) {
  }
  address = {
    street: '',
    unit: '',
    province: '',
    city: '',
    postalCode: ''
  };
  storeName:string='';
  contactName:string='';
  contactEmail:string='';
  personalPhone:string='';
  storePhone:string='';

  provinces = [
    { name: 'Ontario', code: 'ON' },
    { name: 'Quebec', code: 'QC' },
    { name: 'British Columbia', code: 'BC' },
    { name: 'Alberta', code: 'AB' }
  ];

  citiesByProvince: any = {
    ON: ['Toronto', 'Scarborough', 'Ottawa', 'Mississauga'],
    QC: ['Montreal', 'Quebec City'],
    BC: ['Vancouver', 'Victoria'],
    AB: ['Calgary', 'Edmonton']
  };

  cities: string[] = [];

  onProvinceChange() {
    this.cities = this.citiesByProvince[this.address.province] || [];
    this.address.city = ''; // reset city
  }

  addStore() {
    let storeDetails={
      storeName: this.storeName,
      contactName: this.contactName,
      contactEmail: this.contactEmail,
      personalPhone:  this.personalPhone,
      storePhone: this.storePhone,
      address:this.address
    };
    this.crudServices.addStore(storeDetails).then(()=>{
      Swal.fire({
        title: 'Success!',
        text: 'Store details added',
      });
    });
  }
}
