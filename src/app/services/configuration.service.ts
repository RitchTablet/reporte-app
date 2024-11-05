import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '@shared/interfaces/responses/api.response';
import { ConfigurationResponse } from '@shared/interfaces/responses/configuration.response';
import { map, Observable } from 'rxjs';

@Injectable()
export class ConfigurationService {
  private readonly _httpClient = inject(HttpClient);

  getAllConfiguration(): Observable<ConfigurationResponse> {
    return this._httpClient
      .get<ApiResponse<ConfigurationResponse>>('@api-platform/config/all')
      .pipe(map((response) => response.data));
  }
}
