import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  loading = signal<boolean>(false);

  constructor() {}

  show() {
    this.loading.set(true);
  }

  hide() {
    this.loading.set(false);
  }
}
