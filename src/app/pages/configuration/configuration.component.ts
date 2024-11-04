import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputLockComponent } from '@shared/components/input-lock/input-lock.component';
import { TitleContentComponent } from '@shared/components/title-content/title-content.component';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [TitleContentComponent, InputLockComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss',
})
export class ConfigurationComponent implements OnInit {
  formMail!: FormGroup<any>;

  ngOnInit(): void {
    this.formMail = new FormGroup<any>({ provider: new FormControl('') });
  }
}
