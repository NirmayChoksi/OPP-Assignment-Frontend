import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AlertController,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonText,
  ModalController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, createOutline, trashOutline } from 'ionicons/icons';
import { Toast } from 'src/app/shared/services/toast';
import { ProductDetailModalComponent } from './modals/product-detail-modal/product-detail-modal.component';
import { ProductResponse } from './models/interfaces';
import { Product } from './services/product';
import { ProductFormComponent } from './modals/product-form/product-form.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
  standalone: true,
  imports: [
    IonItemOption,
    IonItemOptions,
    IonLabel,
    IonItemSliding,
    IonIcon,
    IonFabButton,
    IonFab,
    IonItem,
    IonList,
    IonText,
    IonContent,
    CommonModule,
    FormsModule,
  ],
})
export class ItemsPage implements OnInit {
  private productService = inject(Product);
  private toastService = inject(Toast);
  private modalController = inject(ModalController);
  private alertController = inject(AlertController);

  products: ProductResponse[] = [];

  constructor() {
    addIcons({ add, createOutline, trashOutline });
  }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.toastService.success(res.message);
        this.products = res.data;
      },
    });
  }

  async addProduct() {
    const modal = await this.modalController.create({
      component: ProductFormComponent,
    });
    modal.onDidDismiss().then((res) => {
      if (res.data) this.loadData();
    });
    return await modal.present();
  }

  async editProduct(product: ProductResponse) {
    const modal = await this.modalController.create({
      component: ProductFormComponent,
      componentProps: { product },
    });
    modal.onDidDismiss().then((res) => {
      if (res.data) this.loadData();
    });
    return await modal.present();
  }

  async deleteProduct(product: ProductResponse) {
    const alert = await this.alertController.create({
      header: 'Delete Product?',
      message: `Are you sure you want to delete "${product.name}"?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.productService.deleteProduct(product.id).subscribe({
              next: () => {
                this.products = [...this.products.filter((p) => p.id !== product.id)];
                this.toastService.success('Product removed!');
                console.log(this.products);
              },
            });
          },
        },
      ],
    });
    await alert.present();
  }

  async openProductDetail(product: ProductResponse) {
    const modal = await this.modalController.create({
      component: ProductDetailModalComponent,
      componentProps: { product },
    });
    return await modal.present();
  }
}
