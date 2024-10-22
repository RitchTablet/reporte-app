import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '@shared/interfaces/responses/api.response';
import { AssgimentProject } from '@shared/constants/report.const';

@Injectable()
export class ProjectService {
  private readonly _httpClient = inject(HttpClient);

  getAssigmentsProjects(): Observable<AssgimentProject[]> {
    return this._httpClient
      .get<ApiResponse<AssgimentProject[]>>('@api-platform/project')
      .pipe(map((response) => response.data));
  }
}
