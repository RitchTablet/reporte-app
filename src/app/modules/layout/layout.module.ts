import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { LayoutRoutingModule } from './layout-routing.module';
import { urlInterceptor } from '@shared/interceptors/url.interceptor';
import { errorInterceptor } from '@shared/interceptors/error.interceptor';
import { loadingInterceptor } from '@shared/interceptors/loading.interceptor';

@NgModule({
  imports: [LayoutRoutingModule, AngularSvgIconModule.forRoot()],
  providers: [provideHttpClient(withInterceptors([urlInterceptor, errorInterceptor,loadingInterceptor]))],
})
export class LayoutModule {}
