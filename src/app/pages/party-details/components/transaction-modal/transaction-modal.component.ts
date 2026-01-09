import { Component, inject, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonNote,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-transaction-modal',
  templateUrl: './transaction-modal.component.html',
  styleUrls: ['./transaction-modal.component.scss'],
  imports: [
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonNote,
    IonSpinner,
    IonText,
    IonTitle,
    IonToolbar,
    ReactiveFormsModule,
  ],
})
export class TransactionModalComponent {
  private modalController = inject(ModalController);

  @Input() form!: FormGroup;
  @Input() transactionType!: 'YOU_GAVE' | 'YOU_GOT';

  dismiss() {
    this.modalController.dismiss();
  }

  onSubmit() {
    if (this.form.valid) {
      this.modalController.dismiss(this.form.value);
    }
  }
}
