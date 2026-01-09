import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { BillDetailsResponse } from 'src/app/home/pages/bills/models/interfaces';
import { Bill } from 'src/app/home/pages/bills/services/bill';
import { Toast } from 'src/app/shared/services/toast';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.page.html',
  styleUrls: ['./bill-details.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonBackButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonList,
    IonSpinner,
    IonText,
    IonTitle,
    IonToolbar,
  ],
})
export class BillDetailsPage implements OnInit {
  private route = inject(ActivatedRoute);
  private billService = inject(Bill);
  private toastService = inject(Toast);

  billDetails: BillDetailsResponse | null = null;

  ngOnInit() {
    const billId = this.route.snapshot.paramMap.get('id');
    if (billId) {
      this.loadBillDetails(billId);
    }
  }

  loadBillDetails(billId: string) {
    this.billService.getBillById(billId).subscribe({
      next: (res) => {
        this.billDetails = res.data;
        this.toastService.success(res.message);
      },
      error: () => {
        this.toastService.error('Error loading bill details');
      },
    });
  }
}
