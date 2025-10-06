import {Component, inject, OnInit} from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardGroupComponent,
  ColComponent,
  ContainerComponent,
  FormControlDirective,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  RowComponent
} from '@coreui/angular';
import { Router } from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {FormsModule} from '@angular/forms';
import {user} from '@angular/fire/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle,FormsModule]
})
export class LoginComponent implements OnInit{
  username:string='';
  password:string='';
  private router = inject(Router);
  constructor(private authService:AuthService) {
  }
  navigateRegister() {
    console.log('register');
    this.router.navigate(['/register']);
  }

  ngOnInit(): void {
    console.log('login')
  }
  login(){
    console.log(this.username)
    this.authService.login(this.username,this.password);
  }
}
