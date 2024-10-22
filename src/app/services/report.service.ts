import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateReportRequest } from '@shared/interfaces/models/createReportRequest';
import { ReportResponse } from '@shared/interfaces/responses/report';
import { ApiResponse } from '@shared/interfaces/responses/api.response';
import { map, Observable } from 'rxjs';
import { ReportDataFromConfig } from '@shared/interfaces/responses/report-data-config.response';

@Injectable()
export class ReportService {
  private readonly _httpClient = inject(HttpClient);

  saveReport(report: CreateReportRequest): Observable<ApiResponse<boolean>> {
    return this._httpClient.post<ApiResponse<boolean>>('@api-platform/report', report);
  }

  getReportsByMonthAndYear(month: number, year: number): Observable<ApiResponse<ReportResponse[]>> {
    const params = { month: month.toString(), year: year.toString() };
    return this._httpClient.get<ApiResponse<ReportResponse[]>>('@api-platform/report/byMonthAndYear', { params });
  }

  generateReportExcel(month: number, year: number): Observable<ApiResponse<boolean>> {
    const params = { month: month.toString(), year: year.toString() };
    return this._httpClient.get<ApiResponse<boolean>>('@api-platform/report/excel/generate', { params });
  }

  getAllExcelFilesNames(): Observable<string[]> {
    return this._httpClient
      .get<ApiResponse<string[]>>('@api-platform/report/excel/all/names')
      .pipe(map((response) => response.data));
  }

  getByFilename(filename: string): Observable<ApiResponse<ReportResponse[]>> {
    const params = { filename };
    return this._httpClient.get<ApiResponse<ReportResponse[]>>('@api-platform/report/byFilename', { params });
  }

  getReportDataFromConfig(): Observable<ReportDataFromConfig> {    
    return this._httpClient
      .get<ApiResponse<ReportDataFromConfig>>('@api-platform/report/data/config')
      .pipe(map((response) => response.data));
  }
}
