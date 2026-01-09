import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/interfaces';
import { environment } from 'src/environments/environment';
import { ProductRequest, ProductResponse } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class Product {
  private http = inject(HttpClient);

  private apiUrl: string = environment.apiUrl + 'products';

  getProducts(): Observable<ApiResponse<ProductResponse[]>> {
    return this.http.get<ApiResponse<ProductResponse[]>>(`${this.apiUrl}`);
  }

  deleteProduct(id: string): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.apiUrl}/${id}`);
  }

  createProduct(payload: ProductRequest): Observable<ApiResponse<ProductResponse>> {
    return this.http.post<ApiResponse<ProductResponse>>(`${this.apiUrl}`, payload);
  }

  updateProduct(id: string, payload: ProductRequest): Observable<ApiResponse<ProductResponse>> {
    return this.http.put<ApiResponse<ProductResponse>>(`${this.apiUrl}/${id}`, payload);
  }
}
