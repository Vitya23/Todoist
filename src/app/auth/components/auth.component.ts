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
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';
import { AuthLabel, AuthPlaceholder } from '../enums/auth.enum';
import { AuthService } from '../services/auth.service';
import { AuthFormI, AuthRequestI } from '../types/auth.interface';
import { initialAuthForm } from '../utils/auth.utils';
import { Icons } from 'src/app/constants/icons';
import { PagePath } from 'src/app/shared/enums/path.enum';
import { PagesTitle } from 'src/app/shared/enums/pages-title.enums';

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
    ErrorMessageComponent,
  ],
})
export class AuthComponent implements OnInit, OnDestroy {
  form: FormGroup<AuthFormI> = initialAuthForm();

  Title = PagesTitle;
  Label = AuthLabel;
  Icons = Icons;
  Placeholder = AuthPlaceholder;
  title = PagesTitle.LOGIN;
  PagePath = PagePath;

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
    if (this.title === this.Title.REGISTER) {
      this.form.addControl(
        'confirmPassword',
        new FormControl(null, Validators.required)
      );
    }
  }

  initializeValues(): void {
    this.route.url.pipe(takeUntil(this.destroy$)).subscribe((url) => {
      if (url[0].path === this.PagePath.LOGIN) {
        this.title = this.Title.LOGIN;
      } else {
        this.title = this.Title.REGISTER;
      }
    });
  }

  onSubmit(): void {
    this.submitting = true;
    this.backendError = null;
    if (this.title === this.Title.LOGIN && this.form.valid) {
      this.authService
        .login({ user: this.form.value } as AuthRequestI)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => this.navigate(PagePath.TODO),
          error: (err) => {
            this.backendError = err.error.message;
            this.submitting = false;
          },
        });
    }
    if (this.title === this.Title.REGISTER && this.form.valid) {
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
          next: () => this.navigate(PagePath.TODO),
          error: (err) => {
            this.backendError = err.error.message;
            this.submitting = false;
          },
        });
    }
  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
