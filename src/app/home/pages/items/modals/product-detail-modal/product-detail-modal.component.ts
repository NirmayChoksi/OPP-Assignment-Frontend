import { Component, inject, Input, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
  ModalController, IonButton } from '@ionic/angular/standalone';
import { ProductResponse } from '../../models/interfaces';

@Component({
  selector: 'app-product-detail-modal',
  templateUrl: './product-detail-modal.component.html',
  styleUrls: ['./product-detail-modal.component.scss'],
  imports: [IonButton, IonContent, IonButtons, IonTitle, IonToolbar, IonHeader],
})
export class ProductDetailModalComponent {
  private modalController = inject(ModalController);

  @Input() product!: ProductResponse;

  close() {
    this.modalController.dismiss();
  }
}
