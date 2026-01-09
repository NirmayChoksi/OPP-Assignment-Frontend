import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  NavController,
} from '@ionic/angular/standalone';
import { BillType } from 'src/app/home/pages/bills/models/enums';
import { Bill } from 'src/app/home/pages/bills/services/bill';
import { ProductResponse } from 'src/app/home/pages/items/models/interfaces';
import { Product } from 'src/app/home/pages/items/services/product';
import { PartyType } from 'src/app/home/pages/parties/models/enums';
import { PartyWithBalanceResponse } from 'src/app/home/pages/parties/models/interfaces';
import { Party } from 'src/app/home/pages/parties/services/party';
import { Toast } from 'src/app/shared/services/toast';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.page.html',
  styleUrls: ['./add-bill.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonSpinner,
    IonButton,
    IonList,
    IonLabel,
    IonItem,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonSelectOption,
    IonInput,
    IonSelect,
  ],
})
export class AddBillPage implements OnInit {
  private fb = inject(FormBuilder);
  private navController = inject(NavController);
  private toast = inject(Toast);
  private productService = inject(Product);
  private partyService = inject(Party);
  private billService = inject(Bill);
  private route = inject(ActivatedRoute);

  form!: FormGroup;
  selectedType!: BillType;
  parties: PartyWithBalanceResponse[] = [];
  products: ProductResponse[] = [];

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const type = params.get('type') as BillType;
      if (type === BillType.SALE || type === BillType.PURCHASE) {
        this.selectedType = type;
        this.form = this.initializeForm();
        this.loadParties();
        this.loadProducts();
      } else {
        this.navController.back();
      }
    });
  }

  initializeForm() {
    return this.fb.group({
      type: [this.selectedType, Validators.required],
      partyId: ['', Validators.required],
      note: [''],
      items: this.fb.array([], Validators.required),
    });
  }

  get items() {
    return this.form.get('items') as FormArray;
  }

  addItem() {
    this.items.push(
      this.fb.group({
        productId: ['', Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]],
      }),
    );
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  loadParties() {
    const partyType = this.selectedType === BillType.SALE ? PartyType.CUSTOMER : PartyType.SUPPLIER;

    this.partyService.getPartiesByType(partyType).subscribe({
      next: (res) => (this.parties = res.data.parties),
      error: () => this.toast.error('Failed to load parties'),
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (res) => (this.products = res.data),
      error: () => this.toast.error('Failed to load products'),
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.billService.createBill(this.form.value).subscribe({
      next: (res) => {
        this.toast.success(res.message);
        this.navController.back();
      },
      error: () => this.toast.error('Unable to create bill'),
    });
  }
}
