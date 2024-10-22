import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '@services/toast.service';
import { toast } from 'ngx-sonner';
import { catchError, Observable, throwError } from 'rxjs';

export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const {message, status, statusText} = error;
      const {message:msg} = error.error;

      toastService.errorHttp(statusText, status, msg);
      
      return throwError(() => message);
    }),
  );
}
