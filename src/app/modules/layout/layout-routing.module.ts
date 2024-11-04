import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ConfigurationComponent } from '@pages/configuration/configuration.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'reports',
    component: LayoutComponent,
    children: [
      {
        path: 'upload',
        loadComponent: () => import('@pages/report/report.component').then((st) => st.ReportComponent),
      },
      {
        path: 'history',
        loadComponent: () => import('@pages/report/history/history.component').then((st) => st.HistoryComponent),
      },
    ],
  },
  {
    path: 'config',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@pages/configuration/configuration.component').then((st) => st.ConfigurationComponent),
      },
    ],
  },
  {
    path: 'components',
    component: LayoutComponent,
    loadChildren: () => import('../uikit/uikit.module').then((m) => m.UikitModule),
  },
  { path: '', redirectTo: 'reports/upload', pathMatch: 'full' },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
