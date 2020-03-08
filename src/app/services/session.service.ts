import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor() { }

  setItem(key, value): void {
    localStorage.setItem(key, value);
  }

  getItem(key) {
    console.log(localStorage.getItem(key));
    return localStorage.getItem(key);
  }

  setObject(key, obj): void {
    const value = JSON.stringify(obj);
    localStorage.setItem(key, value);
  }

  getObject(key) {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  }

  destroy(key) {
    localStorage.removeItem(key);
  }
}
