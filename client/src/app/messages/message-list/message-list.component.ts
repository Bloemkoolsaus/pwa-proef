import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MessageModel} from "../message.model";
import {MessageApiClient} from "../message.api-client";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss'
})
export class MessageListComponent {
  title = 'MessageList';
  messages: MessageModel[] = [];

  constructor(private client: MessageApiClient) {
    this.fetchMessages();
  }

  fetchMessages() {
    this.client.getMessages().subscribe(result => {
      this.messages = result.map(
        message => Object.assign(new MessageModel(message.subject, message.message, message.date), message)
      );
    });
  }

  getMessages(): MessageModel[] {
    return this.messages;
  }
}
