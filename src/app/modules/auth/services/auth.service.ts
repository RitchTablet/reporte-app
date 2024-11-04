import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '@shared/interfaces/responses/api.response';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _httpClient = inject(HttpClient);

  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  login(email: string, password: string): Observable<any> {
    const loginPayload = { email, password };

    return this._httpClient.post<ApiResponse<{ accessToken: string }>>('@api-platform/auth/login', loginPayload).pipe(
      tap((response) => {
        localStorage.setItem('authToken', response.data.accessToken);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  getToken(): string {
    return localStorage.getItem('authToken') ?? '';
  }
}
