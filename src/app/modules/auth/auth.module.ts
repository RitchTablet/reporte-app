import { NgModule } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './services/auth.service';

@NgModule({ 
    imports: [AuthRoutingModule, AngularSvgIconModule.forRoot(),], 
    providers: [AuthService] 
})
export class AuthModule {}
