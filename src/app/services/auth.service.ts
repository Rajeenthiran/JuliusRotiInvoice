import {inject, Injectable} from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import {collectionData, doc, docData, Firestore, getDoc, setDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser:any;
  private router = inject(Router);
  constructor(private auth: Auth,
              private firestore: Firestore,) {}

  async register(username:string,email: string, password: string, role: string) {
    try {
      // ✅ Step 1: Create user with modular API
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      // ✅ Step 2: Save user data in Firestore
      await setDoc(doc(this.firestore, 'Users', user.uid), {
        uid: user.uid,
        username:username,
        email: email,
        role: role,
        createdAt: new Date()
      });
      Swal.fire({
        title: 'Success!',
        text: 'User registered',
      });
      this.router.navigate(['/login'])
      // ✅ Step 3: Send email verification
    //  await sendEmailVerification(user);

      console.log('User registered and role assigned!');
     // this.router.navigate(['/login']);

    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  }
  // ✅ Login function
  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      if (!user) throw new Error('Login failed. No user found.');

      if(user.uid){
        let uid=user.uid
        this.getUserfromFirebaseData(uid);
      }


    } catch (error: any) {
      console.error('Login error:', error.message);
      throw error;
    }
  }
  async getUserfromFirebaseData(uid:string){
    // ✅ Optional: Fetch role from Firestore
    const userDoc = await getDoc(doc(this.firestore, 'Users', uid));
    const userData = userDoc.exists() ? userDoc.data() : null;
    const role = userData ? userData['role'] : 'user';
    if(userData){
      this.setUser(userData);
    }

    await this.router.navigate(['/invoice/view-invoice']);
}
  // ✅ Logout function
  async logout(): Promise<void> {
    await signOut(this.auth);
    this.currentUser = null;
    localStorage.setItem('uid','');
    localStorage.setItem('UserData','');
    await this.router.navigate(['/login']);
  }
  setUser(user:any){
    localStorage.setItem('uid', user.uid);
    localStorage.setItem('UserData',JSON.stringify(user));
    this.currentUser=user;
  }
  getUser(){
    return localStorage.getItem('UserData');
  }

  getUid(){
    return localStorage.getItem('uid');
  }
  // ✅ Helper: check if logged in
  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

}
