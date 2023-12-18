import { Injectable } from '@angular/core';
import { AuthRequestI } from '../types/authRequest.interface';
import { loginFunction } from '../../backend/dataBaseFunctions';
Injectable();
export class AuthServices {
  constructor() {}
  login(user: AuthRequestI) {
    try {
      loginFunction(user);
    } catch (err) {
      console.log(err);
    }
  }
}
