import { Injectable } from '@angular/core';
import {addDoc, collection, collectionData, Firestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  invoiceDbName = 'Invoices';
  invoiceLen=0;
  constructor(private firestore: Firestore) {
  }

  orders = [
    {
      no: 1,
      name: '500 GRAM - KOTHU ROTI',
      code: '500GKR',
      price: 3.15,
      qty: 0,
      total: 0
    },
    {
      no: 2,
      name: '1 KILOGRAM - KOTHU ROTI',
      code: '1KGKR',
      price: 6.00,
      qty: 0,
      total: 0
    },
    {
      no: 3,
      name: '2 KILOGRAM - KOTHU ROTI',
      code: '2KGKR',
      price: 11.00,
      qty: 0,
      total: 0
    },
    {
      no: 4,
      name: '5 KILOGRAM - KOTHU ROTI',
      code: '5KGKR',
      price: 25.00,
      qty: 0,
      total: 0
    },
    {
      no: 5,
      name: '7 KILOGRAM - KOTHU ROTI',
      code: '7KGKR',
      price: 35.00,
      qty: 0,
      total: 0
    },
    {
      no: 6,
      name: 'ROUND PARATHA (4 PIECES)',
      code: 'RP4P',
      price: 3.75,
      qty: 0,
      total: 0
    },
    {
      no: 7,
      name: 'SQUARE PARATHA (4 PIECES)',
      code: 'SP4P',
      price: 3.75,
      qty: 0,
      total: 0
    },
    {
      no: 8,
      name: 'CASSAVA CHIPS',
      code: 'CC',
      price: 0,
      qty: 0,
      total: 0
    }
  ];

  getOrders() {
    return this.orders;
  }

  async addInvoices(invoices: any) {
    const invoiceCollection = collection(this.firestore, this.invoiceDbName);
    return await addDoc(invoiceCollection, {
      invoiceNo: invoices.invoiceNo,
      date: invoices.date,
      storeId: invoices.storeId,
      orders:invoices.orders,
      contactNumber: invoices.contactNumber,
      deliveryAddress: invoices.deliveryAddress,
      deliveryType: invoices.deliveryType,
      paid: invoices.paid,
      comment: invoices.comment,
      totalAmount: invoices.totalAmount,
      createdAt: new Date()
    });
  }
  getInvoiceDetails(){
    const invoiceCollection = collection(this.firestore, this.invoiceDbName);
    return collectionData(invoiceCollection,{idField:'id'}) as Observable<any[]>;
  }
}
