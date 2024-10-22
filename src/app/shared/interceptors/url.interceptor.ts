import { HttpRequest, HttpHandlerFn, HttpEvent } from "@angular/common/http";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";


const urlMappings = new Map([
    ['@api-platform', environment?.apiPlatform],
]);

export function urlInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {    
    let updatedUrl = req.url;

    urlMappings.forEach((value, key) => {
        if (updatedUrl.includes(key)) {
          updatedUrl = updatedUrl.replace(key, value);
        }
    });

    return next(req.clone({ url: updatedUrl }));
}