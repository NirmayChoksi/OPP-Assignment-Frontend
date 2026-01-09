import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonFabButton,
  IonFab,
  IonIcon,
  IonSegmentView,
  IonSegmentContent,
  NavController,
  SegmentValue,
  IonText,
  IonList,
  IonItem,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { receipt } from 'ionicons/icons';
import { Toast } from 'src/app/shared/services/toast';
import { BillType } from './models/enums';
import { BillWithPartyResponse } from './models/interfaces';
import { Bill } from './services/bill';
import { RelativeTimePipe } from '../../../shared/pipe/relative-time-pipe';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.page.html',
  styleUrls: ['./bills.page.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonList,
    IonText,
    CommonModule,
    FormsModule,
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonLabel,
    IonSegment,
    IonSegmentButton,
    IonSegmentContent,
    IonSegmentView,
    RelativeTimePipe,
  ],
})
export class BillsPage {
  private billService = inject(Bill);
  private navController = inject(NavController);

  bills: BillWithPartyResponse[] = [];
  currentSegment: BillType = BillType.SALE;

  constructor() {
    addIcons({ receipt });
  }

  ionViewWillEnter() {
    this.loadData();
  }

  onSegmentChange(value: SegmentValue | undefined) {
    if (value) {
      this.currentSegment = value as BillType;
      this.loadData();
    }
  }

  private loadData() {
    this.bills = [];

    this.billService.getBillsByType(this.currentSegment).subscribe({
      next: (res) => {
        this.bills = res.data;
      },
    });
  }

  navigateToCreateBill() {
    this.navController.navigateForward(['/pages/add-bill'], {
      queryParams: { type: this.currentSegment },
    });
  }

  navigateToBillDetail(id: string) {
    this.navController.navigateForward(['/pages/bill-details', id]);
  }
}
