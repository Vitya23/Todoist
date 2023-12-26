import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthTitle } from '../types/authTitle.type';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordValidators } from '../../shared/validators/passwordValidator';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../services/auth.service';
import { AuthRequestI } from '../types/authRequest.interface';
import { AuthFormI } from '../types/authForm.interface';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
  ],
})
export class AuthComponent implements OnInit, OnDestroy {
  form!: FormGroup<AuthFormI>;
  title: AuthTitle = 'REGISTER';
  routeSubs!: Subscription;
  authSubs!: Subscription;
  user!: AuthRequestI;
  submitting = false;
  backendError!: string;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group<AuthFormI>(
      {
        email: this.fb.control(null, [Validators.required, Validators.email]),
        password: this.fb.control(
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            PasswordValidators.patternValidator(new RegExp('(?=.*[0-9])'), {
              requiresDigit: true,
            }),
            PasswordValidators.patternValidator(new RegExp('(?=.*[A-Z])'), {
              requiresUppercase: true,
            }),
            PasswordValidators.patternValidator(new RegExp('(?=.*[a-z])'), {
              requiresLowercase: true,
            }),
            PasswordValidators.patternValidator(
              new RegExp('(?=.*[!@#$%^&*])'),
              {
                requiresSpecialChars: true,
              }
            ),
          ])
        ),
        confirmPassword: this.fb.control(null, [Validators.required]),
      },
      { validators: PasswordValidators.MatchValidator }
    );
  }

  initializeValues(): void {
    this.routeSubs = this.route.url.subscribe((e) => {
      if (e[0].path === 'login') {
        this.title = 'LOGIN';
      } else {
        this.title = 'REGISTER';
      }
    });
  }

  get passwordValid() {
    return this.form.controls['password'].errors === null;
  }
  get minLengthValid() {
    return !this.form.controls['password'].hasError('minlength');
  }

  get requireValid() {
    return !this.form.controls['password'].hasError('required');
  }

  get requiresDigitValid() {
    return !this.form.controls['password'].hasError('requiresDigit');
  }
  get requiresUppercaseValid() {
    return !this.form.controls['password'].hasError('requiresUppercase');
  }
  get requiresLowercaseValid() {
    return !this.form.controls['password'].hasError('requiresLowercase');
  }
  get requiresSpecialCharsValid() {
    return !this.form.controls['password'].hasError('requiresSpecialChars');
  }

  onSubmit(): void {
    this.submitting = true;
    this.backendError = '';
    if (
      this.title === 'LOGIN' &&
      this.form.controls['email'].valid &&
      this.form.controls['password'].valid
    ) {
      this.authSubs = this.authService
        .login({
          user: {
            email: this.form.controls['email'].value ?? '',
            password: this.form.controls['password'].value ?? '',
          },
        })
        .subscribe({
          next: () => this.router.navigateByUrl('/todo'),
          error: (err) => {
            this.backendError = err.error.message;
            this.submitting = false;
          },
        });
    }
    if (this.title === 'REGISTER' && this.form.valid) {
      this.authSubs = this.authService
        .register({
          user: {
            email: this.form.controls['email'].value ?? '',
            password: this.form.controls['password'].value ?? '',
          },
        })
        .subscribe({
          next: () => this.router.navigateByUrl('/todo'),
          error: (err) => {
            this.backendError = err.error.message;
            this.submitting = false;
          },
        });
    } else {
      return;
    }
  }

  ngOnDestroy(): void {
    if (this.authSubs) {
      this.authSubs.unsubscribe();
    }

    this.routeSubs.unsubscribe();
  }
}
