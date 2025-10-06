import {Component, inject} from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  ColComponent,
  ContainerComponent,
  FormControlDirective,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  RowComponent
} from '@coreui/angular';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [ContainerComponent, RowComponent, ColComponent, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective,FormsModule]
})
export class RegisterComponent {

  username:string = '';
  email = '';
  password = '';
  cpassword = '';
  role = 'user';
  alert='';
  private router = inject(Router);
  constructor(private authService:AuthService) {
  }
  navigateLogin() {
    this.router.navigate(['/login']);

  }
  register(){
    console.log(this.username);
    this.alert='';
    if(this.username==''||this.username==null){
      this.alert='Please enter username';
    } if(this.email==''||this.email==null){
      this.alert='Please enter username';
    }else if(this.password==''||this.password==null){
      this.alert='Please enter password';
    }else if(this.cpassword==''||this.cpassword==null){
      this.alert='Please enter confirm password';
    }else if(this.password!=this.cpassword){
      this.alert='Confirm password is different';
    }else{
      this.authService.register(this.username,this.email,this.password,this.role).then((res)=>{
        console.log(res);
      })
    }
  }
}
