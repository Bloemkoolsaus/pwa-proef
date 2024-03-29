import { Component } from '@angular/core';
import { MessageApiClient} from "../messages/message.api-client";
import {SwPush, SwUpdate} from "@angular/service-worker";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private swUpdate: SwUpdate,
    private swPush: SwPush,
    private apiClient: MessageApiClient
  ) { }

  subscribeToNotifications() {
    if (!this.swPush.isEnabled) {
      console.log("swPush is disabled");
    }

    console.log('register:'+this.apiClient.VAPID_PUBLIC_KEY);

    this.swPush.requestSubscription({
      serverPublicKey: this.apiClient.VAPID_PUBLIC_KEY
    }).then(sub => {
      console.log(this.apiClient);
      this.apiClient.subscribeToNotifications(sub).subscribe(console.log);
    }).catch(error => console.warn(error));
  }
}
