import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes, RouterLink, Router } from '@angular/router';
import { Auth } from '../../services/auth-service';

import { Control } from '../../shared/control/control';
import { Button } from '../../shared/button/button';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, Control, Button],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})

export class Login {
  private authService = inject(Auth);
  router = inject(Router);
  error?: string;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;

    this.authService.login(email, password).subscribe({
      next: (resData) => {
        console.log(resData);

        this.router.navigate(['/dashboard']);
        this.loginForm.reset();
      },
      error: (err: Error) => {
        console.log(err); // mostra o objeto Error completo
        this.error = err.message; // pega a string que você quer exibir
      },
      complete() {
        console.log('Login success')
      },
    })

  }


}
