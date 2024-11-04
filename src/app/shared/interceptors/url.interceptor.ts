import { HttpRequest, HttpHandlerFn, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { urlMappingsConst } from "./urls.const";

export function urlInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {    
    let updatedUrl = req.url;

    urlMappingsConst.forEach((value, key) => {
        if (updatedUrl.includes(key)) {
          updatedUrl = updatedUrl.replace(key, value.url);
        }
    });

    return next(req.clone({ url: updatedUrl }));
}