import { HttpRequest, HttpHandlerFn, HttpEvent } from "@angular/common/http";
import { inject } from "@angular/core";
import { LoadingService } from "@services/loading.service";
import { delayWhen, finalize, Observable, timer } from "rxjs";


export function loadingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {    
    const loadingService = inject(LoadingService);

    loadingService.show();

    return next(req)
    .pipe(
        delayWhen(()=> timer(500)),
        finalize(()=> loadingService.hide())
    );
}