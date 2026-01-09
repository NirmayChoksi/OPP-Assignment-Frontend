import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { Auth } from '../services/auth';

@Component({
  selector: 'app-number-login',
  templateUrl: './number-login.page.html',
  styleUrls: ['./number-login.page.scss'],
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
export class NumberLoginPage implements OnInit {
  private authService = inject(Auth);
  private fb = inject(FormBuilder);
  private navController = inject(NavController);
  private toastService = inject(Toast);

  form!: FormGroup;

  ngOnInit() {
    this.form = this.initializeForm();
  }

  initializeForm() {
    return this.fb.group({
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
  }

  get contactNumber() {
    return this.form.get('contactNumber');
  }

  onSubmit() {
    if (this.form.invalid) return;
    const contactNumber = this.form.value.contactNumber;
    this.authService.requestOtp(contactNumber).subscribe({
      next: ({ data }) => {
        this.toastService.success(data.message);
        this.navController.navigateForward(['/auth/verify-otp'], {
          queryParams: { contactNumber: data.contactNumber },
        });
        this.form.reset();
      },
    });
  }
}
