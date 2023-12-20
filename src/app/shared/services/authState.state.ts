import { Injectable, WritableSignal, effect, signal } from '@angular/core';
import { CurrentUserI } from '../types/currentUser.interface';

Injectable();
export class AuthState {
  public isLoggedInState = signal(false);
  public currentUserState: WritableSignal<CurrentUserI | null> = signal(null);

  constructor() {
    if (localStorage.getItem('accessToken')) {
      this.isLoggedInState.set(true);
    }
  }
}
