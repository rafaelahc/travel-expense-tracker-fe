import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';

import { Control } from '../../shared/control/control';
import { Button } from '../../shared/button/button';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, Control, Button],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  private authService = inject(Auth);
  router = inject(Router);

  error?: string

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })


  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const name = this.registerForm.value.name!;
    const email = this.registerForm.value.email!;
    const password = this.registerForm.value.password!;


    this.authService.signUp(name, email, password).subscribe({
      next: (resData) => {
        console.log(resData);
        this.registerForm.reset();

        this.router.navigate(['/dashboard']);
      },

      error: (errorMessage) => {
        console.log("Erro Message", errorMessage);
        this.error = errorMessage;
      },

      complete: () => {
        console.log('Sign-up completed.');
      }
    });

  }
}


