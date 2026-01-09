import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class Toast {
  private toastCtrl = inject(ToastController);

  async show(message: string, color: string = 'primary', duration: number = 2500) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      color,
      position: 'top',
    });

    await toast.present();
  }

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'danger');
  }

  warning(message: string) {
    this.show(message, 'warning');
  }

  info(message: string) {
    this.show(message, 'medium');
  }
}
