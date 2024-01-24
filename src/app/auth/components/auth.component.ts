import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Subject, takeUntil } from 'rxjs';
import { VALIDATOR_ERROR } from 'src/app/constants/validatorConstants';
import { Title } from '../enums/title.enum';
import { AuthService } from '../services/auth.service';
import { AuthFormI, AuthRequestI } from '../types/auth.interface';
import { initialAuthForm } from '../utils/auth.utils';

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
  form: FormGroup<AuthFormI> = initialAuthForm();
  readonly Title = Title;
  title: Title = Title.Login;
  destroy$ = new Subject<void>();
  submitting = false;
  backendError: string | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.addFormControls();
  }

  addFormControls(): void {
    if (this.title === this.Title.Register) {
      this.form.addControl(
        'confirmPassword',
        new FormControl(null, Validators.required)
      );
    }
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

  getValidationErrorMessage(formControl: FormControl): string | null {
    const errorKey = Object.keys(formControl.errors || {})[0];
    const customError = VALIDATOR_ERROR.find(
      (validatorError) => validatorError.errorAssociation === errorKey
    );
    return customError?.errorMessage || null;
  }

  onSubmit(): void {
    this.submitting = true;
    this.backendError = null;
    if (this.title === Title.Login && this.form.valid) {
      this.authService
        .login({ user: this.form.value } as AuthRequestI)
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
      const { email, password } = this.form.value;
      this.authService
        .register({
          user: {
            email: email as string,
            password: password as string,
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
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
