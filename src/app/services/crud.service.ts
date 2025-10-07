import { Injectable } from '@angular/core';
import {Auth} from '@angular/fire/auth';
import {addDoc, collection, doc, Firestore, setDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {
  storeDbName='Stores';

  constructor(private auth: Auth,
              private firestore: Firestore,) {}
  async addStore(stores:any) {
    const companyCollection = collection(this.firestore, this.storeDbName);
    return await addDoc(companyCollection,{storeName: stores.storeName,
      contactName: stores.contactName,
      contactEmail: stores.contactEmail,
      personalPhone:  stores.personalPhone,
      storePhone: stores.storePhone,
      address:stores.address});

  }
}
