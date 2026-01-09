import { Component, inject, Input, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonInput,
  IonNote,
  ModalController,
  NavController, IonText, IonSpinner } from '@ionic/angular/standalone';
import { ProductResponse } from '../../models/interfaces';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Toast } from 'src/app/shared/services/toast';
import { Product } from '../../services/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  imports: [IonSpinner, IonText, 
    IonNote,
    IonInput,
    IonContent,
    IonButton,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
    ReactiveFormsModule,
  ],
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(Product);
  private toastService = inject(Toast);
  private modalController = inject(ModalController);
  private navCtrl = inject(NavController);

  @Input() product: ProductResponse | null = null;

  form!: FormGroup;
  mode: 'add' | 'edit' = 'add';

  ngOnInit() {
    this.mode = this.product ? 'edit' : 'add';
    this.form = this.fb.group({
      name: [this.product?.name ?? '', Validators.required],
      quantity: [this.product?.quantity ?? 1, [Validators.required, Validators.min(1)]],
      price: [this.product?.price ?? 0, [Validators.required, Validators.min(0.01)]],
    });
  }

  get name() {
    return this.form.get('name');
  }

  get quantity() {
    return this.form.get('quantity');
  }

  get price() {
    return this.form.get('price');
  }

  onSubmit() {
    if (this.form.invalid) return;

    const payload = this.form.value;
    if (this.mode === 'add') {
      this.productService.createProduct(payload).subscribe({
        next: (res) => {
          this.toastService.success('Product added successfully!');
          this.modalController.dismiss(true);
        },
      });
    } else if (this.mode === 'edit' && this.product) {
      this.productService.updateProduct(this.product.id, payload).subscribe({
        next: () => {
          this.toastService.success('Product updated successfully!');
          this.modalController.dismiss(true);
        },
      });
    }
  }

  close() {
    this.modalController.dismiss();
  }
}
