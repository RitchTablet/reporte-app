import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
import { catchError, Observable, throwError } from 'rxjs';
import { urlMappingsConst } from './urls.const';
import { Router } from '@angular/router';

export function jwtInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  let updatedUrl = req.url;
  let needsToken = false;
  let requiresAuth = false;

  const authService = inject(AuthService);
  const router = inject(Router);
  const token: string = authService.getToken();

  urlMappingsConst.forEach((value, key) => {
    if (updatedUrl.includes(key)) {
      needsToken = true;
      requiresAuth = value.requiresAuth;
    }
  });

  if (token && needsToken)
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {      
      if (error.status === 401 && requiresAuth) {        
        authService.logout();
        router.navigate(['/auth/sign-in']);
      }

      return throwError(() => error);
    }),
  );
}
