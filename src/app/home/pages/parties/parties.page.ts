import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardContent,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSegment,
  IonSegmentButton,
  IonSegmentContent,
  IonSegmentView,
  IonText,
  NavController,
  SegmentValue,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { downloadOutline, personAdd } from 'ionicons/icons';
import { AbsPipe } from 'src/app/shared/pipe/abs-pipe';
import { RelativeTimePipe } from 'src/app/shared/pipe/relative-time-pipe';
import { PartyType } from './models/enums';
import { PartyListSummaryResponse } from './models/interfaces';
import { Party } from './services/party';
import { Transaction } from './services/transaction';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.page.html',
  styleUrls: ['./parties.page.scss'],
  standalone: true,
  imports: [
    AbsPipe,
    CommonModule,
    FormsModule,
    IonCard,
    IonCardContent,
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonSegment,
    IonSegmentButton,
    IonSegmentContent,
    IonSegmentView,
    IonText,
    RelativeTimePipe,
  ],
})
export class PartiesPage {
  private partyService = inject(Party);
  private navController = inject(NavController);
  private transactionService = inject(Transaction);

  parties: PartyListSummaryResponse = {
    totalYouGave: 0,
    totalYouGot: 0,
    netBalance: 0,
    parties: [],
  };
  currentSegment: string = 'CUSTOMERS';

  constructor() {
    addIcons({ personAdd, downloadOutline });
  }

  ionViewWillEnter() {
    this.loadData(this.currentSegment);
  }

  onSegmentChange(value: SegmentValue | undefined) {
    if (value) {
      this.currentSegment = String(value);
      this.loadData(this.currentSegment);
    }
  }

  private loadData(segment: string) {
    const partyType = segment === 'CUSTOMERS' ? PartyType.CUSTOMER : PartyType.SUPPLIER;
    this.parties = { totalYouGave: 0, totalYouGot: 0, netBalance: 0, parties: [] };

    this.partyService.getPartiesByType(partyType).subscribe({
      next: (res) => {
        console.log(`${segment} data:`, res);
        this.parties = res.data;
      },
      error: (err) => console.error(err),
    });
  }

  navigateToAddParty() {
    const partyType = this.currentSegment === 'CUSTOMERS' ? PartyType.CUSTOMER : PartyType.SUPPLIER;
    this.navController.navigateForward(['/pages/add-party'], {
      queryParams: { type: partyType },
    });
  }

  downloadTransactions() {
    this.transactionService.downloadTransactionsPdf();
  }

  navigateToPartyDetail(id: string) {
    this.navController.navigateForward(['/pages/party-details', id]);
  }
}
