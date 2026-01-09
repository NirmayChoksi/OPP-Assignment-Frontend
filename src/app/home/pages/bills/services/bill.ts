import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/interfaces';
import { environment } from 'src/environments/environment';
import { BillType } from '../models/enums';
import {
  BillDetailsResponse,
  BillResponse,
  BillWithPartyResponse,
  CreateBillRequest,
} from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class Bill {
  private http = inject(HttpClient);

  private apiUrl: string = environment.apiUrl + 'bills';

  getBillsByType(type: BillType): Observable<ApiResponse<BillWithPartyResponse[]>> {
    return this.http.get<ApiResponse<BillWithPartyResponse[]>>(`${this.apiUrl}/type/${type}`);
  }

  getBillById(id: string): Observable<ApiResponse<BillDetailsResponse>> {
    return this.http.get<ApiResponse<BillDetailsResponse>>(`${this.apiUrl}/${id}`);
  }

  createBill(payload: CreateBillRequest): Observable<ApiResponse<BillResponse>> {
    return this.http.post<ApiResponse<BillResponse>>(`${this.apiUrl}`, payload);
  }
}
