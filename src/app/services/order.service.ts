import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders=[{
    name:'500 GRAM - KOTHU ROTI',
    code:'500GKR',
    price:3.15,
  },{
    name:'500 GRAM - KOTHU ROTI',
    price:3.15,
  }]
}
