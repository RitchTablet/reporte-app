import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReportService } from '@services/report.service';
import { ToggleLockUnLockButtonIconComponent } from '@shared/components/toggle-lock-un-lock-button-icon/toggle-lock-un-lock-button-icon.component';
import { AssgimentProject } from '@shared/constants/report.const';

import { ReportForm } from '@shared/interfaces/forms/report.form';
import { CreateReportRequest } from '@shared/interfaces/models/createReportRequest';
import { DateService } from '@shared/services/date.service';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { TitleContentComponent } from '@shared/components/title-content/title-content.component';
import { InputLockComponent } from '@shared/components/input-lock/input-lock.component';
import { ProjectService } from '@services/project.service';
import { FormTool, ReportFormFactory } from '@shared/forms/report.form.factory';
import { ProviderService } from '@services/provider.service';
import { combineLatest } from 'rxjs';
import { ReportDataFromConfig } from '@shared/interfaces/responses/report-data-config.response';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
    ToggleLockUnLockButtonIconComponent,
    TitleContentComponent,
    InputLockComponent,
  ],
  providers: [ReportService, ProjectService, ProviderService],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent implements OnInit {
  private readonly _reportService = inject(ReportService);
  private readonly _dateService = inject(DateService);
  private readonly _proyectService = inject(ProjectService);

  listAssigmentsProjects = signal<AssgimentProject[]>([]);  

  form!: FormGroup<ReportForm>;

  ngOnInit(): void {    
    const formControls = ReportFormFactory.createFormControls();
    this.form = new FormGroup<ReportForm>(formControls);
    
    const controlsToDisable: string[] = [
      'provider',
      'consultorId',
      'userWinId',
      'jiraId',
      'axityTribe',
      'axitySquadLead',
      'wmTechLead',
      'professionalName',
    ];

    this.form = FormTool.disableControls(this.form, controlsToDisable);

    this.getData();
  }

  getData() {    

    combineLatest([
      this._proyectService.getAssigmentsProjects(),
      this._reportService.getReportDataFromConfig(),
    ]).subscribe(
      ([projects, reportDataConfig]) => {
        this.listAssigmentsProjects.set(projects || []);
        this.form = FormTool.setForm<ReportDataFromConfig>(this.form, reportDataConfig);
      },
    );
  }

  onSave() {
    if (this.form.invalid) {
      console.error('Algunos campos del formulario son requeridos.');
      return;
    }

    const reportData = this.form.getRawValue();

    const { name: proyectName } =
      (this.listAssigmentsProjects().find(
        (project) => project.id == reportData.assignmentProject,
      ) as AssgimentProject) || '';

    const report: CreateReportRequest = {
      ...reportData,
      proyectName,
    } as CreateReportRequest;

    this._reportService.saveReport(report).subscribe((response)=> console.log(response));
  }

  onEnableDisableFormControl(formControlName: string) {
    const formcontrol = this.form.get(formControlName);

    if (!formcontrol) return;

    formcontrol.disabled ? formcontrol.enable() : formcontrol.disable();
  }
}
