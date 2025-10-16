import {Component, inject} from '@angular/core';
import {CardComponent, RowComponent} from '@coreui/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CRUDService} from '../../../services/crud.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-company',
  imports: [RowComponent, CardComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './add-company.component.html',
  styleUrl: './add-company.component.scss'
})
export class AddCompanyComponent {
  private router = inject(Router);
  id:string='';
  isEdit:boolean=false;
  constructor(private crudServices:CRUDService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      let store=navigation.extras.state['store'];
      console.log(store)
      if(store){
        this.storeName = store.storeName;
        this.contactName = store.contactName;
        this.contactEmail = store.contactEmail;
        this.personalPhone = store.personalPhone;
        this.storePhone = store.storePhone;
        this.address = {
          street: store.address.street,
          unit: store.address.unit,
          province: store.address.province,
          city: store.address.city,
          postalCode: store.address.postalCode
        };
        this.cities = this.citiesByProvince[store.address.province] || [];
        this.address.city= store.address.city;
        this.id= store.id;
        this.isEdit=true;
      }
    }
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
    ON: ['Toronto', 'Scarborough', 'Ottawa', 'Mississauga','Etobicoke','Maple','Brampton'],
    QC: ['Montreal', 'Quebec City'],
    BC: ['Vancouver', 'Victoria'],
    AB: ['Calgary', 'Edmonton']
  };

  cities: string[] = [];

  onProvinceChange() {
    this.cities = this.citiesByProvince[this.address.province] || [];
    this.address.city = ''; // reset city
  }
  editStore(){
    if(this.id){
      let storeDetails={
        id:this.id,
        storeName: this.storeName,
        contactName: this.contactName,
        contactEmail: this.contactEmail,
        personalPhone:  this.personalPhone,
        storePhone: this.storePhone,
        address:this.address
      };
      this.crudServices.updateStore(storeDetails).then(()=>{
        Swal.fire({
          title: 'Success!',
          text: 'Store details updated',
        });
      });
    }

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
