import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthTitle } from '../types/authTitle.type';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordValidators } from '../../shared/validators/passwordValidator';
import { PasswordModule } from 'primeng/password';
import { AuthServices } from '../services/auth.services';
import { AuthRequestI } from '../types/authRequest.interface';

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
    ReactiveFormsModule,
    PasswordModule,
  ],
  providers: [AuthServices],
})
export class AuthComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  title: AuthTitle = 'REGISTER';
  subscription!: Subscription;
  user!: AuthRequestI;
  constructor(
    private readonly route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthServices
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
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
          ]),
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: PasswordValidators.MatchValidator }
    );
  }

  initializeValues(): void {
    this.subscription = this.route.url.subscribe((e) => {
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
    if (
      this.title === 'LOGIN' &&
      this.form.controls['email'].valid &&
      this.form.controls['password'].valid
    ) {
      this.authService.login({
        user: {
          email: this.form.controls['email'].value,
          password: this.form.controls['password'].value,
        },
      });
    }
    if (this.title === 'REGISTER' && this.form.valid) {
      this.authService.login({
        user: {
          email: this.form.controls['email'].value,
          password: this.form.controls['password'].value,
        },
      });
    } else {
      return;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
