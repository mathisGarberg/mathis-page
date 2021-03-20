import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { LocalStorageService } from '../local-storage/local-storage.service';

export interface LoginResponse {
  user: {
    _id?: string;
    email: string;
    token: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static BASE_URL = '/api/v1';

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      `${AuthService.BASE_URL}/login`,
      {
        user: {
          email,
          password
        }
      }
    );
  }

  getToken(): { token: string } {
    return this.localStorageService.getItem('AUTH');
  }
}
