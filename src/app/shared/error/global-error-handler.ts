import { ErrorHandler, Injectable, inject } from '@angular/core';
import { Toast } from '../services/toast';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private toastService = inject(Toast);

  async handleError(error: any) {
    console.error('GLOBAL ERROR:', error);

    // this.toastService.error('Something went wrong!');
  }
}
