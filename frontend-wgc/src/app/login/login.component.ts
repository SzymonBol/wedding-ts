import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ROUTE } from '../shared/routes.enum';
import { AuthService } from '../services/auth.service';
import { AuthCredentials } from '../types/auth.types';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
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
  private authService = inject(AuthService);
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

    const response = this.authService.login(credentials).subscribe( resp => {
      this.router.navigateByUrl(ROUTE.ADMIN_MANAGE_INVITATIONS);
    });
  }

  redirectToHome(){
    this.router.navigateByUrl(ROUTE.HOME);
  }
}
