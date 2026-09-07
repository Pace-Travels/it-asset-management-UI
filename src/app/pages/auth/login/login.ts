import { Component, inject } from '@angular/core';
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
import { StorageService } from '../../../core/services/storage.service';

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

  // Modern Angular Injection pattern
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private storageService = inject(StorageService); // StorageService Inject kiya
  private router = inject(Router);
  private messageService = inject(MessageService);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
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

    const { email, password, rememberMe } = this.loginForm.value;

    this.authService.login(email, password, rememberMe).subscribe({
      next: (response: any) => {
        this.isLoading = false;

        if (response.success) {
          // Tokens & User Save in SessionStorage
          if (response.data) {
            this.storageService.setAccessToken(response.data.accessToken, rememberMe);
            this.storageService.setRefreshToken(response.data.refreshToken, rememberMe);
            this.storageService.setUser(response.data.user, rememberMe);
          }

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message || 'Login Successful'
          });

          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = response.message || 'Login Failed';
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: this.errorMessage
          });
        }
      },
      error: (error: any) => {
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