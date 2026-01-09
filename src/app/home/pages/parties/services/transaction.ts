import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/interfaces';
import { environment } from 'src/environments/environment';
import { CreateTransactionRequest, TransactionResponse } from '../models/interfaces';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class Transaction {
  private http = inject(HttpClient);
  private fileOpener = inject(FileOpener);
  private file = inject(File);
  private platform = inject(Platform);

  private apiUrl: string = environment.apiUrl + 'transactions';

  createTransaction(
    payload: CreateTransactionRequest,
  ): Observable<ApiResponse<TransactionResponse>> {
    return this.http.post<ApiResponse<TransactionResponse>>(`${this.apiUrl}`, payload);
  }

  downloadTransactions() {
    return this.http.get(`${this.apiUrl}/download`, { responseType: 'blob' });
  }

  downloadTransactionsPdf() {
    this.http.get(`${this.apiUrl}/download`, { responseType: 'blob' }).subscribe(
      async (response: Blob) => {
        if (this.platform.is('cordova') || this.platform.is('capacitor')) {
          // Mobile - save to local file system
          const filePath = this.file.dataDirectory + 'transactions.pdf';
          await this.file.writeFile(this.file.dataDirectory, 'transactions.pdf', response, {
            replace: true,
          });
          this.fileOpener
            .open(filePath, 'application/pdf')
            .then(() => console.log('PDF opened'))
            .catch((err) => console.log('Error opening file', err));
        } else {
          // Web
          saveAs(response, 'transactions.pdf');
        }
      },
      (error) => {
        console.error('Error downloading PDF:', error);
      },
    );
  }
}
