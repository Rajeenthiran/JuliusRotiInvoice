import { Injectable } from '@angular/core';
import {Auth} from '@angular/fire/auth';
import {addDoc,updateDoc ,deleteDoc , collection, collectionData, doc, Firestore, setDoc} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

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
  async updateStore(store: any) {
      const storeDocRef = doc(this.firestore, this.storeDbName, store.id);
     return await updateDoc(storeDocRef, {
        storeName: store.storeName,
        contactName: store.contactName,
        contactEmail: store.contactEmail,
        personalPhone: store.personalPhone,
        storePhone: store.storePhone,
        address: store.address
      });

  }
  getStores(): Observable<any[]> {
    const storesCollection = collection(this.firestore, this.storeDbName);
    return collectionData(storesCollection,{idField:'id'}) as Observable<any[]>;
  }

  async deleteStore(id: string) {
      const storeDocRef = doc(this.firestore, this.storeDbName, id);
     return await deleteDoc(storeDocRef);

  }
}
