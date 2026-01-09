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
  IonBackButton,
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
  NavController,
} from '@ionic/angular/standalone';
import { PartyType } from 'src/app/home/pages/parties/models/enums';
import { CreatePartyRequest } from 'src/app/home/pages/parties/models/interfaces';
import { Party } from 'src/app/home/pages/parties/services/party';
import { Toast } from 'src/app/shared/services/toast';

@Component({
  selector: 'app-add-party',
  templateUrl: './add-party.page.html',
  styleUrls: ['./add-party.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonBackButton,
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
export class AddPartyPage implements OnInit {
  private fb = inject(FormBuilder);
  private navController = inject(NavController);
  private partyService = inject(Party);
  private route = inject(ActivatedRoute);
  private toastService = inject(Toast);

  constructor() {}

  selectedType!: PartyType;
  form!: FormGroup;

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const type = params.get('type');
      if ((type && type == PartyType.CUSTOMER) || type == PartyType.SUPPLIER) {
        this.selectedType = type;
        this.form = this.initializeForm();
      } else {
        this.navController.back();
      }
    });
  }

  initializeForm() {
    return this.fb.group({
      name: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      type: [this.selectedType],
      gstNumber: [''],
    });
  }

  get name() {
    return this.form.get('name');
  }

  get contactNumber() {
    return this.form.get('contactNumber');
  }

  get gstNumber() {
    return this.form.get('gstNumber');
  }

  onSubmit() {
    if (this.form.invalid) return;

    const payload: CreatePartyRequest = this.form.value as CreatePartyRequest;
    this.partyService.createParty(payload).subscribe({
      next: (response) => {
        this.toastService.success(response.message);
        this.navController.back();
      },
    });
  }
}
