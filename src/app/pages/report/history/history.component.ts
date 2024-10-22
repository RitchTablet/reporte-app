import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReportService } from '@services/report.service';
import { TableComponent } from '@shared/components/table/table.component';
import { TitleContentComponent } from '@shared/components/title-content/title-content.component';
import { ReportMonthYearForm } from '@shared/interfaces/forms/report-month-year.form';
import { ReportResponse } from '@shared/interfaces/responses/report';
import { Month } from '@shared/interfaces/month';
import { ApiResponse } from '@shared/interfaces/responses/api.response';
import { ColumnTable, DataTable } from '@shared/interfaces/table';
import { DateService } from '@shared/services/date.service';
import { capitalizeFirstLetter } from '@shared/utils/capitalizeFirstLetter';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [TitleContentComponent, TableComponent, AngularSvgIconModule, FormsModule, ReactiveFormsModule],
  providers: [ReportService],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit {
  private readonly _reportService = inject(ReportService);
  private readonly _dateService = inject(DateService);

  months = signal<Month[]>([]);
  columns = signal<ColumnTable[]>([
    { key: 'provider', header: 'Proveedor' },
    { key: 'date', header: 'Fecha' },
    { key: 'consultorId', header: 'ID Consultor' },
    { key: 'userWinId', header: 'Usuario Windows' },
    { key: 'professionalName', header: 'Nombre del Profesional', minWidth: 300 },
    { key: 'axityTribe', header: 'Axity Tribe' },
    { key: 'axitySquadLead', header: 'Axity Squad Lead', minWidth: 300 },
    { key: 'wmTechLead', header: 'WM Teach Lead', minWidth: 150 },
    { key: 'jiraId', header: 'ID Jira', minWidth: 150 },
    { key: 'proyectName', header: 'Nombre del Proyecto', minWidth: 700 },
    { key: 'activitiesDescription', header: 'Actividades', minWidth: 400 },
    { key: 'hours', header: 'Horas' },
    { key: 'deliverables', header: 'Entregables', minWidth: 400 },
    { key: 'comments', header: 'Comentarios', minWidth: 400 },
  ]);

  dataTable = signal<DataTable[]>([]);
  excelsNames = signal<string[]>([]);

  form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup<ReportMonthYearForm>({
      month: new FormControl(this._dateService.getCurrentMonth(), Validators.required),
      year: new FormControl(this._dateService.getCurrentYear(), Validators.required),
    });

    const months = this._dateService.getMonths().map((m) => ({ id: m.id, name: capitalizeFirstLetter(m.name) }));
    this.months.set(months);

    this._reportService.getAllExcelFilesNames().subscribe((names: string[]) => this.excelsNames.set(names));
  }

  onSearch() {
    if (this.form.invalid) {
      console.error('Invalid form!.');
      return;
    }

    const { month, year } = this.form.value;

    this._reportService.getReportsByMonthAndYear(month, year).subscribe((response: ApiResponse<ReportResponse[]>) => {
      const { data } = response;
      const dataMap = data.map((d) => ({ ...d, date: this._dateService.formatDate(d.date) }));
      this.dataTable.set(dataMap);
    });
  }

  onSearchByFileName(filename:string) {
    this._reportService.getByFilename(filename).subscribe((response: ApiResponse<ReportResponse[]>) => {
      const { data } = response;
      const dataMap = data.map((d) => ({ ...d, date: this._dateService.formatDate(d.date) }));
      this.dataTable.set(dataMap);
    });
  }

  onGenerateExcel() {
    const { month, year } = this.form.value;
    this._reportService.generateReportExcel(month, year).subscribe();
  }
}
