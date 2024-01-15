import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordValidators } from '../../shared/validators/passwordValidator';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../services/auth.service';
import { AuthFormI } from '../types/authForm.interface';
import { Title } from '../enums/title.enum';

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
  Title = Title;
  title: Title = Title.Login;
  destroy$ = new Subject<void>();
  submitting = false;
  backendError: string | null = null;

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
    this.route.url.pipe(takeUntil(this.destroy$)).subscribe((url) => {
      if (url[0].path === Title.Login) {
        this.title = Title.Login;
      } else {
        this.title = Title.Register;
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
    this.backendError = null;
    if (
      this.title === Title.Login &&
      this.form.controls['email'].valid &&
      this.form.controls['password'].valid !== null
    ) {
      this.authService
        .login({
          user: {
            email: this.form.controls['email'].value ?? '',
            password: this.form.controls['password'].value ?? '',
          },
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => this.router.navigateByUrl('/todo'),
          error: (err) => {
            this.backendError = err.error.message;
            this.submitting = false;
          },
        });
    }
    if (this.title === Title.Register && this.form.valid) {
      this.authService
        .register({
          user: {
            email: this.form.controls['email'].value ?? '',
            password: this.form.controls['password'].value ?? '',
          },
        })
        .pipe(takeUntil(this.destroy$))
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
    this.destroy$.next();
    this.destroy$.complete();
  }
}
