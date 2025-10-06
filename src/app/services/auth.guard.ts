import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService,private router: Router) {}

  async canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      let uid=this.auth.getUid();
      console.log('uid:'+uid);
      if(uid){
        resolve(true)
      }else{
        this.router.navigate(['/login']);
        resolve(false);
      }
    });
  }
}
