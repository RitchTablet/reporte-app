import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '@shared/interfaces/responses/api.response';
import { ProviderResponse } from '@shared/interfaces/responses/provider.response';

@Injectable()
export class ProviderService {
  private readonly _httpClient = inject(HttpClient);

  getAll(): Observable<ProviderResponse[]> {
    return this._httpClient
      .get<ApiResponse<ProviderResponse[]>>('@api-platform/provider')
      .pipe(map((response) => response.data));
  }
}
