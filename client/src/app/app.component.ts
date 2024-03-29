import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from '@angular/router';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {SwPush} from "@angular/service-worker";
import {MessageApiClient} from "./messages/message.api-client";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, RouterLink, RouterLinkActive, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PWA-Proef';
}
