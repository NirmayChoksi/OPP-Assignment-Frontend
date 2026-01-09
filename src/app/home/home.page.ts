import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { albumsOutline, logOutOutline, peopleOutline, receiptOutline } from 'ionicons/icons';
import { Auth } from '../auth/services/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButton, IonHeader, IonIcon, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar],
})
export class HomePage {
  private authService = inject(Auth);

  constructor() {
    addIcons({ peopleOutline, receiptOutline, albumsOutline, logOutOutline });
  }

  logout() {
    this.authService.logout();
  }
}
