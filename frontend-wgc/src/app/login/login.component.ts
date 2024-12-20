import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ROUTE } from '../shared/routes.enum';
import { HttpAuthService } from '../services/auth.service';
import { AuthCredentials, LoginResponse } from '../types/auth.types';
import { firstValueFrom, tap } from 'rxjs';
import { AuthDataStore } from '../shared/store/auth.store';

@Component({
    selector: 'app-login',
    imports: [MatInputModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  });

  private router = inject(Router);
  private authStore = inject(AuthDataStore);
  private authService = inject(HttpAuthService);
  error = signal<string | undefined>(undefined);


  async onSubmit(){
    const login = this.loginForm.controls.login.value;
    const password = this.loginForm.controls.password.value;

    if(!(login && password)){
      this.error.set('uzupełnij dane');
      return;
    }

    const credentials : AuthCredentials = {
      login,
      password
    }

    try{
      const result = await firstValueFrom(this.authService.login(credentials));
      if(!result.body) {
        throw new Error('Something wrong with response');
      }
      this.authStore.updateLoginStatus(result.body);
      this.router.navigateByUrl(ROUTE.ADMIN_MANAGE_INVITATIONS);
    } catch(error){
      this.authStore.updateLoginStatus({isFine: false, user: null});
      console.error(error);
    }
  }

  redirectToHome(){
    this.router.navigateByUrl(ROUTE.HOME);
  }
}
