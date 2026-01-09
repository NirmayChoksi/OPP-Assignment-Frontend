import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
  NavController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowDownCircle, arrowUpCircle } from 'ionicons/icons';
import { TransactionType } from 'src/app/home/pages/parties/models/enums';
import { PartyDetailResponse } from 'src/app/home/pages/parties/models/interfaces';
import { Party } from 'src/app/home/pages/parties/services/party';
import { Transaction } from 'src/app/home/pages/parties/services/transaction';
import { Toast } from 'src/app/shared/services/toast';
import { RelativeTimePipe } from '../../shared/pipe/relative-time-pipe';
import { TransactionModalComponent } from './components/transaction-modal/transaction-modal.component';

@Component({
  selector: 'app-party-details',
  templateUrl: './party-details.page.html',
  styleUrls: ['./party-details.page.scss'],
  standalone: true,
  imports: [
    IonBackButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonChip,
    IonItemDivider,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonIcon,
    IonButton,
    IonSpinner,
    IonText,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RelativeTimePipe,
  ],
})
export class PartyDetailsPage implements OnInit {
  private fb = inject(FormBuilder);
  private partyService = inject(Party);
  private route = inject(ActivatedRoute);
  private toastService = inject(Toast);
  private navController = inject(NavController);
  private modalController = inject(ModalController);
  private transactionService = inject(Transaction);

  form!: FormGroup;
  partyDetail: PartyDetailResponse | null = null;
  partyId: string | null = null;

  constructor() {
    addIcons({ arrowUpCircle, arrowDownCircle });
  }

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.partyId = id;
          this.loadData(id);
        } else {
          this.navController.back();
        }
      },
    });
  }

  private loadData(id: string) {
    this.partyService.getPartyById(id).subscribe({
      next: (res) => {
        this.toastService.success(res.message);
        this.partyDetail = res.data;
        console.log(res.data);
      },
    });
  }

  initializeTransactionForm() {
    this.form = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      note: [''],
      type: ['', Validators.required],
      partyId: ['', Validators.required],
    });
  }

  async openTransactionModal(id: string, type: TransactionType) {
    this.initializeTransactionForm();
    this.form.patchValue({
      type,
      partyId: id,
    });

    const modal = await this.modalController.create({
      component: TransactionModalComponent,
      componentProps: {
        form: this.form,
        transactionType: type,
      },
    });

    modal.onDidDismiss().then(({ data }) => {
      if (data) {
        this.transactionService.createTransaction(data).subscribe({
          next: (res) => {
            this.toastService.success(res.message);
          },
        });
      }
    });

    return await modal.present();
  }

  onYouGave() {
    if (!this.partyId) return;
    this.openTransactionModal(this.partyId, TransactionType.YOU_GAVE);
  }

  onYouGot() {
    if (!this.partyId) return;
    this.openTransactionModal(this.partyId, TransactionType.YOU_GOT);
  }
}
