import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonNote,
  IonText,
  IonTitle,
  IonToolbar,
  NavController, IonSpinner } from '@ionic/angular/standalone';
import { Toast } from 'src/app/shared/services/toast';
import { VerifyOtpRequest } from '../models/interfaces';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.page.html',
  styleUrls: ['./otp-verification.page.scss'],
  standalone: true,
  imports: [IonSpinner, 
    CommonModule,
    FormsModule,
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonNote,
    IonText,
    IonTitle,
    IonToolbar,
    ReactiveFormsModule,
  ],
})
export class OtpVerificationPage implements OnInit {
  private authService = inject(Auth);
  private fb = inject(FormBuilder);
  private navController = inject(NavController);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastService = inject(Toast);

  form!: FormGroup;
  contactNumber!: string;

  ngOnInit() {
    this.route.queryParamMap.subscribe({
      next: (params) => {
        const contactNumber = params.get('contactNumber');
        if (contactNumber) {
          this.contactNumber = contactNumber;
        }
      },
    });
    this.form = this.initializeForm();
  }

  initializeForm() {
    return this.fb.group({
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    });
  }

  get otp() {
    return this.form.get('otp');
  }

  onSubmit() {
    if (this.form.invalid || !this.contactNumber) return;

    const otp = this.form.value.otp;
    const payload: VerifyOtpRequest = { otp, contactNumber: this.contactNumber };
    this.authService.verifyOtp(payload).subscribe({
      next: (response) => {
        this.toastService.success(response.message);
        this.form.reset();
        this.navController.navigateRoot(['/home']);
      },
    });
  }
}
