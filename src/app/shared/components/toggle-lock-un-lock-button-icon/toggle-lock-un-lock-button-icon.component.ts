import { Component, EventEmitter, Output } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';


@Component({
  selector: 'app-toggle-lock-un-lock-button-icon',
  standalone: true,
  imports: [AngularSvgIconModule],
  template: `
    <button (click)="onLockUnLock()" type="button">
      @if (isClose) {
        <svg-icon src="assets/icons/heroicons/outline/lock-closed.svg" [svgClass]="'h-4 w-4 text-muted-foreground'"></svg-icon>
      } @else {
        <svg-icon src="assets/icons/heroicons/outline/lock-open.svg" [svgClass]="'h-4 w-4 text-muted-foreground'"></svg-icon>
      }
    </button>
  `,
})
export class ToggleLockUnLockButtonIconComponent {
  isClose: boolean = true;
  
  @Output() onIsOpen = new EventEmitter<boolean>();
  
  onLockUnLock() {
    this.isClose = !this.isClose;
    this.onIsOpen.emit(this.isClose);
  }
}
