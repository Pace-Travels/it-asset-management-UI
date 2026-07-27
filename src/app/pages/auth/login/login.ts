import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

  showPassword = false;

  isLoading = false;

  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
  ) {

    this.loginForm = this.fb.group({

      email: ['', [Validators.required]],

      password: ['', [Validators.required]]

    });

  }

  togglePassword(): void {

    this.showPassword = !this.showPassword;

  }

  onSubmit(): void {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;

    }

    this.isLoading = true;

    this.errorMessage = '';

    const payload = {

      email: this.loginForm.value.email,

      password: this.loginForm.value.password

    };

    this.authService.login(

      payload.email,

      payload.password

    ).subscribe({

      next: (response) => {

        this.isLoading = false;

        if (response.success) {

          this.messageService.add({

            severity: 'success',

            summary: 'Success',

            detail: response.message

          });

          this.router.navigate(['/dashboard']);

        }

        else {

          this.errorMessage = response.message;

          this.messageService.add({

            severity: 'error',

            summary: 'Login Failed',

            detail: response.message

          });

        }

      },

      error: (error) => {

        this.isLoading = false;

        this.errorMessage = error?.error?.message || 'Login Failed';

        this.messageService.add({

          severity: 'error',

          summary: 'Error',

          detail: this.errorMessage

        });

      }

    });

  }
}