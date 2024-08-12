import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  private token: any

  setToken(token: any) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }
}
