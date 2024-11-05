import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleLockUnLockButtonIconComponent } from '@shared/components/toggle-lock-un-lock-button-icon/toggle-lock-un-lock-button-icon.component';


type typeDataInput = 
  'text' |
  'email' |
  'url' |
  'password' |
  'number' |
  'date' |
  'datetime-local' |
  'month' |
  'search' |
  'tel' |
  'time' |
  'week';

@Component({
  selector: 'app-input-lock',
  standalone: true,
  imports: [ToggleLockUnLockButtonIconComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './input-lock.component.html',
  styleUrl: './input-lock.component.scss'
})
export class InputLockComponent {

  @Input() formGroup!: FormGroup;
  @Input() controlName: string = 'provider';
  @Input() label: string = '';
  @Input() typeData: typeDataInput = 'text';

  @Output() onIsOpen = new EventEmitter<void>();

  onEnableDisableFormControl() {
    const formControl = this.formGroup.get(this.controlName);
    if (!formControl) return;

    formControl.disabled ? formControl.enable() : formControl.disable();
  }
}
