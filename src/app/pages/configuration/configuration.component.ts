import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigurationService } from '@services/configuration.service';
import { InputLockComponent } from '@shared/components/input-lock/input-lock.component';
import { TitleContentComponent } from '@shared/components/title-content/title-content.component';
import { configWrapperForm } from '@shared/forms/config-wrapper.form';
import { ConfigFormFactory } from '@shared/forms/config.form.factory';
import { FormTool } from '@shared/forms/report.form.factory';
import { ConfigForm } from '@shared/interfaces/forms/config.form';
import { ConfigurationResponse } from '@shared/interfaces/responses/configuration.response';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [TitleContentComponent, InputLockComponent, ReactiveFormsModule, FormsModule],
  providers: [ConfigurationService],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss',
})
export class ConfigurationComponent implements OnInit {
  private readonly _configurationService = inject(ConfigurationService);

  form!: FormGroup<ConfigForm>;

  ngOnInit(): void {
    const formControls = ConfigFormFactory.createFormControls();
    this.form = new FormGroup<ConfigForm>(formControls);

    const controlsToDisable: Array<keyof ConfigForm> = ['user', 'password'];
    this.form = FormTool.disableControls(this.form, controlsToDisable);

    this.getData();
  }

  getData() {
    this._configurationService.getAllConfiguration().subscribe((response: ConfigurationResponse) => {      
      const formData = {...response.mailData}      
      this.form = FormTool.setForm<configWrapperForm>(this.form, formData);
    });
  }
}
