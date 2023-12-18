import { Injectable } from '@angular/core';
import { AuthRequestI } from '../types/authRequest.interface';
import { loginFunction } from '../../backend/dataBaseFunctions';
Injectable();
export class AuthServices {
  constructor() {}
  login(user: AuthRequestI) {
    loginFunction(user).subscribe({
      next(value) {
        console.log(value);
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
