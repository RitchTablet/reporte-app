import { Component, inject } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';
import { NgxSonnerToaster } from 'ngx-sonner';
import { NgxLoadingModule } from 'ngx-loading';
import { LoadingService } from '@services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NgClass, RouterOutlet, ResponsiveHelperComponent, NgxSonnerToaster, NgxLoadingModule, CommonModule],
})
export class AppComponent {
  title = 'Angular Tailwind';

  loadingService = inject(LoadingService);

  constructor(public themeService: ThemeService) {}
}
