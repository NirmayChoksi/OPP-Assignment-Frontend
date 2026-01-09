import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/interfaces';
import { environment } from 'src/environments/environment.prod';
import { PartyType } from '../models/enums';
import {
  CreatePartyRequest,
  CreatePartyResponse,
  PartyDetailResponse,
  PartyListSummaryResponse,
} from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class Party {
  private http = inject(HttpClient);

  private apiUrl: string = environment.apiUrl + 'parties';

  getPartiesByType(type: PartyType): Observable<ApiResponse<PartyListSummaryResponse>> {
    return this.http.get<ApiResponse<PartyListSummaryResponse>>(`${this.apiUrl}/type/${type}`);
  }

  createParty(payload: CreatePartyRequest): Observable<ApiResponse<CreatePartyResponse>> {
    return this.http.post<ApiResponse<CreatePartyResponse>>(`${this.apiUrl}`, payload);
  }

  getPartyById(id: string): Observable<ApiResponse<PartyDetailResponse>> {
    return this.http.get<ApiResponse<PartyDetailResponse>>(`${this.apiUrl}/${id}`);
  }
}
